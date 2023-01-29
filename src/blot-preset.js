import YAML from "yaml";
import { version } from '../package.json'

export default class BlotPreset {
  constructor() {
    this.id = "blot";
    this.meta = import.meta;
    this.name = "Blot preset";
  }

  get info() {
    return {
      name: `Blot preset ${version}`,
    };
  }

  /**
   * Post types
   *
   * @returns {object} Post types configuration
   */
  get postTypes() {
    return [
      {
        type: "article",
        name: "Article",
        post: {
          path: "Posts/[Articles]/{yyyy}-{MM}-{dd}-{slug}.md",
          url: "articles/{yyyy}/{MM}/{slug}",
        },
        media: {
          path: "Posts/[Articles]/_media/{yyyy}/{MM}/{dd}/{filename}",
        },
      },
      {
        type: "note",
        name: "Note",
        post: {
          path: "Posts/[Notes]/{yyyy}-{MM}-{dd}-{slug}.md",
          url: "notes/{yyyy}/{MM}/{dd}/{slug}",
        },
        media: {
          path: "Posts/[Notes]/_media/photos/{yyyy}/{MM}/{dd}/{filename}",
        },
      },
      {
        type: "photo",
        name: "Photo",
        post: {
          path: "Posts/[Photos]/{yyyy}-{MM}-{dd}-{slug}.md",
          url: "photos/{yyyy}/{MM}/{slug}",
        },
        media: {
          path: "Posts/[Photos]/_media/photos/{yyyy}/{MM}/{dd}/{filename}",
        },
      },
      {
        type: "video",
        name: "Video",
        post: {
          path: "Posts/[Videos]/{yyyy}-{MM}-{dd}-{slug}.md",
          url: "videos/{yyyy}/{MM}/{slug}",
        },
        media: {
          path: "Posts/[Videos]/_media/videos/{yyyy}/{MM}/{dd}/{filename}",
        },
      },
      {
        type: "audio",
        name: "Audio",
        post: {
          path: "Posts/[Audio]/{yyyy}-{MM}-{dd}-{slug}.md",
          url: "audio/{yyyy}/{MM}/{slug}",
        },
        media: {
          path: "Posts/[Audio]/_media/audio/{yyyy}/{MM}/{dd}/{filename}",
        },
      },
      {
        type: "bookmark",
        name: "Bookmark",
        post: {
          path: "Posts/[Bookmarks]/{yyyy}-{MM}-{dd}-{slug}.md",
          url: "bookmarks/{yyyy}/{MM}/{dd}/{slug}",
        },
      },
      {
        type: "checkin",
        name: "Checkin",
        post: {
          path: "Posts/[Checkins]/{yyyy}-{MM}-{dd}-{slug}.md",
          url: "checkins/{yyyy}/{MM}/{dd}/{slug}",
        },
      },
      {
        type: "event",
        name: "Event",
        post: {
          path: "Posts/[Events]/{yyyy}-{MM}-{dd}-{slug}.md",
          url: "events/{yyyy}/{MM}/{dd}/{slug}",
        },
      },
      {
        type: "rsvp",
        name: "RSVP",
        post: {
          path: "Posts/[RSVPs]/{yyyy}-{MM}-{dd}-{slug}.md",
          url: "replies/{yyyy}/{MM}/{dd}/{slug}",
        },
      },
      {
        type: "reply",
        name: "Reply",
        post: {
          path: "Posts/[Replies]/{yyyy}-{MM}-{dd}-{slug}.md",
          url: "replies/{yyyy}/{MM}/{dd}/{slug}",
        },
      },
      {
        type: "repost",
        name: "Repost",
        post: {
          path: "Posts/[Reposts]/{yyyy}-{MM}-{dd}-{slug}.md",
          url: "reposts/{yyyy}/{MM}/{dd}/{slug}",
        },
      },
      {
        type: "like",
        name: "Like",
        post: {
          path: "Posts/[Likes]/{yyyy}-{MM}-{dd}-{slug}.md",
          url: "likes/{yyyy}/{MM}/{dd}/{slug}",
        },
      },
    ];
  }

  /**
   * Post template
   *
   * @param {object} properties - Post data variables
   * @returns {string} Rendered template
   */
  postTemplate(properties) {
    let content;
    if (properties.content) {
      content =
        properties.content.text ||
        properties.content.html ||
        properties.content;
      content = `${content}\n`;
    } else {
      content = "";
    }

    properties = {
      date: properties.published,
      ...(properties.url && { link: properties.url }),
      ...(properties.updated && { date: properties.updated }),
      ...(properties.name && { title: properties.name }),
      ...(properties.summary && { summary: properties.summary }),
      ...(properties.category && { tags: properties.category }),
      ...(properties.start && { start: properties.start }),
      ...(properties.end && { end: properties.end }),
      ...(properties.rsvp && { rsvp: properties.rsvp }),
      ...(properties.location && { location: properties.location }),
      ...(properties.checkin && { checkin: properties.checkin }),
      ...(properties.audio && { audio: properties.audio }),
      ...(properties.photo && { photo: properties.photo }),
      ...(properties.video && { video: properties.video }),
      ...(properties["bookmark-of"] && {
        "bookmark-of": properties["bookmark-of"],
      }),
      ...(properties["like-of"] && { "like-of": properties["like-of"] }),
      ...(properties["repost-of"] && { "repost-of": properties["repost-of"] }),
      ...(properties["in-reply-to"] && {
        "in-reply-to": properties["in-reply-to"],
      }),
      ...(properties["post-status"] === "draft" && { draft: "Yes" }),
      ...(properties.visibility && { visibility: properties.visibility }),
      ...(properties.syndication && { syndication: properties.syndication }),
      ...(properties.references && { references: properties.references }),
    };
    let frontMatter = YAML.stringify(properties, { lineWidth: 0 });
    frontMatter = `---\n${frontMatter}---\n`;

    return frontMatter + content;
  }

  init(Indiekit) {
    Indiekit.addPreset(this);
  }
}
