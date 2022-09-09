import { LocalStorage } from "@raycast/api";
import {Feed} from "./domain";
export async function loadFeeds(){
    const feeds = await LocalStorage.getItem<string>("feeds");
    if (!feeds) {
        return [];
    }
    return JSON.parse(feeds) as Feed[];
}

export async function saveFeeds(feed: Feed) {
    let feeds = await loadFeeds()
    // add feed to feeds if url is different
    const newFeeds = [...feeds.filter(f => f.url !== feed.url), feed]
    await LocalStorage.setItem("feeds", JSON.stringify(newFeeds));
}

export async function removeFeeds(feed: Feed) {
    const feeds = await loadFeeds();
    const newFeeds = feeds.filter((f) => f.url !== feed.url);
    await LocalStorage.setItem("feeds", JSON.stringify(newFeeds));
}