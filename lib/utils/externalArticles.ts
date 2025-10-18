/**
 * Utility functions for fetching external articles from Medium and Substack
 */

interface RSSArticle {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail?: string;
  creator?: string;
}

/**
 * Parse RSS XML to extract article data
 */
function parseRSSFeed(xmlText: string): RSSArticle[] {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
  const items = xmlDoc.querySelectorAll('item');
  
  const articles: RSSArticle[] = [];
  
  items.forEach((item) => {
    const title = item.querySelector('title')?.textContent || '';
    const link = item.querySelector('link')?.textContent || '';
    const pubDate = item.querySelector('pubDate')?.textContent || '';
    const description = item.querySelector('description')?.textContent || '';
    const creator = item.querySelector('creator')?.textContent || 
                   item.querySelector('author')?.textContent || '';
    
    // Try to extract thumbnail from content:encoded or description
    let thumbnail = '';
    const contentEncoded = item.querySelector('encoded')?.textContent || '';
    const imgMatch = (contentEncoded || description).match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch) {
      thumbnail = imgMatch[1];
    }
    
    articles.push({
      title,
      link,
      pubDate,
      description: stripHtml(description),
      thumbnail,
      creator
    });
  });
  
  return articles;
}

/**
 * Strip HTML tags from string
 */
function stripHtml(html: string): string {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

/**
 * Calculate read time from content length
 */
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Format date to consistent format
 */
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } catch {
    return dateString;
  }
}

/**
 * Fetch articles from Medium RSS feed
 * @param username - Medium username (e.g., '@yourusername')
 */
export async function fetchMediumArticles(username: string): Promise<any[]> {
  try {
    // Medium RSS feed URL
    const rssUrl = `https://medium.com/feed/${username}`;
    
    // Use a CORS proxy to fetch the RSS feed
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;
    
    const response = await fetch(proxyUrl);
    const data = await response.json();
    
    if (!data.contents) {
      throw new Error('Failed to fetch Medium articles');
    }
    
    const rssArticles = parseRSSFeed(data.contents);
    
    return rssArticles.map((article, index) => ({
      id: `medium-${index}`,
      title: article.title,
      date: formatDate(article.pubDate),
      readTime: calculateReadTime(article.description),
      image: article.thumbnail || 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=400',
      link: article.link,
      externalUrl: article.link,
      excerpt: article.description.substring(0, 200) + '...',
      type: 'Article',
      tags: ['Medium'],
      status: 'published',
      author: article.creator,
      source: 'medium',
      slug: `medium-${index}`
    }));
  } catch (error) {
    console.error('Error fetching Medium articles:', error);
    return [];
  }
}

/**
 * Fetch articles from Substack RSS feed
 * @param subdomain - Substack subdomain (e.g., 'yoursubstack')
 */
export async function fetchSubstackArticles(subdomain: string): Promise<any[]> {
  try {
    // Substack RSS feed URL
    const rssUrl = `https://${subdomain}.substack.com/feed`;
    
    // Use a CORS proxy to fetch the RSS feed
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;
    
    const response = await fetch(proxyUrl);
    const data = await response.json();
    
    if (!data.contents) {
      throw new Error('Failed to fetch Substack articles');
    }
    
    const rssArticles = parseRSSFeed(data.contents);
    
    return rssArticles.map((article, index) => ({
      id: `substack-${index}`,
      title: article.title,
      date: formatDate(article.pubDate),
      readTime: calculateReadTime(article.description),
      image: article.thumbnail || 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=400',
      link: article.link,
      externalUrl: article.link,
      excerpt: article.description.substring(0, 200) + '...',
      type: 'Article',
      tags: ['Substack'],
      status: 'published',
      author: article.creator,
      source: 'substack',
      slug: `substack-${index}`
    }));
  } catch (error) {
    console.error('Error fetching Substack articles:', error);
    return [];
  }
}

/**
 * Fetch all external articles (Medium + Substack)
 * Configure your usernames here
 */
export async function fetchAllExternalArticles(): Promise<any[]> {
  const allArticles: any[] = [];
  
  // Configure your Medium username here (uncomment and add your username)
  const mediumUsername = '@deaneeth';
  const mediumArticles = await fetchMediumArticles(mediumUsername);
  allArticles.push(...mediumArticles);

  // Configure your Substack subdomain here (uncomment and add your subdomain)
  const substackSubdomain = 'deaneeth';
  const substackArticles = await fetchSubstackArticles(substackSubdomain);
  allArticles.push(...substackArticles);

  return allArticles;
}
