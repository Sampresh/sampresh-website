export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  status: string;
  date: string;
  views: number;
  image?: string;
  readTime?: string;
  slug?: string;
  content?: string;
};

export const defaultBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "A Journey to Pathivara – Power, Peace, and Purpose",
    excerpt:
      "Recently, I visited Pathivara Temple in Taplejung — one of Nepal's most powerful and spiritually intense destinations. The journey wasn't just about reaching a place; it was about feeling something greater than myself.",
    image: "/images/pathivara.jpeg",
    date: "April 25, 2025",
    readTime: "4 min read",
    category: "Travel",
    status: "Published",
    views: 245,
    slug: "journey-to-pathivara",
    content:
      "Recently, I visited Pathivara Temple in Taplejung — one of Nepal's most powerful and spiritually intense destinations. The journey wasn't just about reaching a place; it was about feeling something greater than myself.\n\nPerched high in the hills, the climb to Pathivara tested my endurance and focus. But every step felt worth it. As I reached the temple, surrounded by silence and prayers carried by the wind, I genuinely felt a kind of peace I hadn't experienced in a long time.\n\nI'm not overly religious, but something about that place hit different — like I'd stepped into a force that grounds you. It reminded me to stay humble, driven, and grateful for where I'm headed.\n\nSometimes, disconnecting from the world helps you reconnect with your own clarity. Pathivara gave me that.",
  },
  {
    id: 2,
    title: "Solo Ride to Pokhara – Just Me, My Bike, and the Road",
    excerpt:
      "Six months ago, I took a solo bike trip to Pokhara. No group, no plans — just me and my machine. It was one of the most freeing things I've ever done.",
    image: "/images/pokhara.jpeg",
    date: "May 20, 2024",
    readTime: "5 min read",
    category: "Adventure",
    status: "Published",
    views: 189,
    slug: "solo-ride-to-pokhara",
    content:
      "Six months ago, I took a solo bike trip to Pokhara. No group, no plans — just me and my machine. It was one of the most freeing things I've ever done.\n\nThe ride itself was powerful — winding roads, changing skies, unexpected turns. I wasn't looking for adventure, but somehow I found it in every mile. Stopping whenever I felt like it, taking in views that no camera could do justice to, and just thinking about life without distractions... it was exactly what I needed.\n\nPokhara was beautiful as always — calm lakes, chill cafés, mountain views. But the real thrill was in the ride. It taught me that sometimes, being alone on the road gives you answers you didn't even know you were looking for.",
  },
]; 