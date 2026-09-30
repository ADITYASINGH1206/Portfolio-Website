import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export interface LeetCodeStatsResponse {
  success: boolean;
  username: string;
  profileUrl: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  rating: number;
  globalRanking: number;
  topPercentage: number;
  attendedContests: number;
  badge: string | null;
  fromFallback?: boolean;
  updatedAt: string;
}

const FALLBACK_STATS: Omit<LeetCodeStatsResponse, "success" | "updatedAt"> = {
  username: "adityasingh1206",
  profileUrl: "https://leetcode.com/u/adityasingh1206/",
  totalSolved: 1114,
  easySolved: 511,
  mediumSolved: 510,
  hardSolved: 93,
  rating: 2007,
  globalRanking: 21629,
  topPercentage: 2.54,
  attendedContests: 32,
  badge: "Knight",
};

const LEETCODE_GRAPHQL_ENDPOINT = "https://leetcode.com/graphql";

const USER_PROFILE_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      totalParticipants
      topPercentage
      badge {
        name
      }
    }
  }
`;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "adityasingh1206";
  const profileUrl = `https://leetcode.com/u/${username}/`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(LEETCODE_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer: profileUrl,
      },
      body: JSON.stringify({
        query: USER_PROFILE_QUERY,
        variables: { username },
      }),
      signal: controller.signal,
      next: { revalidate: 3600 },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`LeetCode API responded with status ${response.status}`);
    }

    const payload = await response.json();

    if (payload.errors && payload.errors.length > 0) {
      throw new Error(payload.errors[0]?.message || "GraphQL query error");
    }

    const matchedUser = payload?.data?.matchedUser;
    if (!matchedUser) {
      throw new Error(`User "${username}" not found on LeetCode`);
    }

    const acSubmissions: Array<{ difficulty: string; count: number }> =
      matchedUser.submitStatsGlobal?.acSubmissionNum || [];

    const totalSolved =
      acSubmissions.find((s) => s.difficulty === "All")?.count ??
      FALLBACK_STATS.totalSolved;
    const easySolved =
      acSubmissions.find((s) => s.difficulty === "Easy")?.count ??
      FALLBACK_STATS.easySolved;
    const mediumSolved =
      acSubmissions.find((s) => s.difficulty === "Medium")?.count ??
      FALLBACK_STATS.mediumSolved;
    const hardSolved =
      acSubmissions.find((s) => s.difficulty === "Hard")?.count ??
      FALLBACK_STATS.hardSolved;

    const contest = payload?.data?.userContestRanking;
    const rating = contest?.rating ? Math.round(contest.rating) : FALLBACK_STATS.rating;
    const globalRanking = contest?.globalRanking ?? FALLBACK_STATS.globalRanking;
    const topPercentage = contest?.topPercentage ?? FALLBACK_STATS.topPercentage;
    const attendedContests =
      contest?.attendedContestsCount ?? FALLBACK_STATS.attendedContests;
    const badge = contest?.badge?.name ?? FALLBACK_STATS.badge;

    const data: LeetCodeStatsResponse = {
      success: true,
      username,
      profileUrl,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      rating,
      globalRanking,
      topPercentage,
      attendedContests,
      badge,
      fromFallback: false,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.warn("Failed to fetch live stats from LeetCode GraphQL, returning fallback:", error);

    const fallbackResponse: LeetCodeStatsResponse = {
      success: true,
      ...FALLBACK_STATS,
      username,
      profileUrl,
      fromFallback: true,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(fallbackResponse, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
      },
    });
  }
}
