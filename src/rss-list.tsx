import { List, ActionPanel, Action } from "@raycast/api";
import { useEffect, useState } from "react";
import ArticleList from "./article-list";
import { Feed } from "./domain";
import { loadFeeds, removeFeeds } from "./store";

export default function RSSList() {
    const [feeds, setFeeds] = useState<Feed[]>([]);
    async function getFeeds() {
        let f = await loadFeeds()
        setFeeds(f);
    }
    useEffect(() => {
        getFeeds()
    }, [feeds])
    return (
        <List
            actions={
                <ActionPanel>
                    <Action
                        title="Refresh"
                        onAction={() => {
                            console.log("refresh")
                            getFeeds()
                        }} />
                </ActionPanel>
            }>
            {feeds.map((feed, index) => {
                return <List.Item
                    key={index}
                    subtitle={{ "tooltip": "tool", "value": feed.url }}
                    icon={feed.icon} title={feed.title} actions={
                        <ActionPanel>
                            <Action.Push title="View" target={<ArticleList feed={feed}/>} />
                            <Action title="Reload" onAction={() => getFeeds()} />
                            <Action.CopyToClipboard title="Copy URL" content={feed.url} icon={null}/>
                            <Action title="Delete Rss Source" shortcut={undefined} onAction={() => {
                                removeFeeds(feed)
                                getFeeds()
                            }} />
                        </ActionPanel>
                    }
                />
            })}
        </List>
    )
}