const axios = require('axios');

// GitHub token to avoid rate limiting
const GITHUB_TOKEN = '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';

const headers = {
  Authorization: `token ${GITHUB_TOKEN}`,
  'User-Agent': 'Empire-GitStalk-Scraper',
};

async function gitstalk(username) {
  if (!username) throw new Error('No GitHub username provided');

  const userUrl = `https://api.github.com/users/${username}`;
  const reposUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

  try {
    const [userRes, reposRes] = await Promise.all([
      axios.get(userUrl, { headers }),
      axios.get(reposUrl, { headers }),
    ]);

    const user = userRes.data;
    const repos = reposRes.data;

    const topRepo = repos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)[0];

    return {
      creator: 'Empire Tech',
      username: user.login,
      name: user.name || '-',
      bio: user.bio || '-',
      company: user.company || '-',
      blog: user.blog || '-',
      location: user.location || '-',
      email: user.email || '-',
      twitter: user.twitter_username || '-',
      public_repos: user.public_repos,
      followers: user.followers,
      following: user.following,
      created_at: user.created_at,
      updated_at: user.updated_at,
      avatar: user.avatar_url,
      profile: user.html_url,
      top_repo: topRepo
        ? {
            name: topRepo.name,
            url: topRepo.html_url,
            stars: topRepo.stargazers_count,
            forks: topRepo.forks_count,
            language: topRepo.language,
          }
        : null,
    };
  } catch (err) {
    if (err.response?.status === 404) {
      throw new Error('GitHub user not found');
    }
    throw new Error('GitHub API error: ' + err.message);
  }
}

module.exports = { gitstalk };
