import { Form, ActionPanel, Action, List, useNavigation, showToast, Toast, Icon } from '@raycast/api'
import { Feed, Article } from "./domain";
import Parser from "rss-parser";
import { useState, useEffect } from "react";
import TurndownService from 'turndown';
export default function ArticleList(props: { feed: Feed }) {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
    const [isShowMeta, setIsShowMeta] = useState<boolean>(false);

    useEffect(() => {
        async function getArticles() {
            setIsLoading(true)
            let rssFeed = await new Parser().parseURL(props.feed.url)
            let articleList = rssFeed.items.map((item) => {
                return { "title": item.title ? item.title : "", "creator": item.creator ? item.creator : "", "link": item.link, "pubDate": item.pubDate, "content": new TurndownService().turndown(item.content ? item.content : ""), "contentSnippet": item.contentSnippet, "guid": item.guid, "isoDate": item.isoDate }
            })
            setArticles(articleList);
            setIsLoading(false)
        }
        getArticles()
    }, [])
    useEffect(() => {
    }, [isShowMeta])
    return (
        <List isLoading={isLoading} isShowingDetail={isShowDetail}>
            {articles.map((article, index) => {
                return <List.Item
                    key={index}
                    title={article.title}
                    accessories={[{ "text": article.isoDate},]}
                    actions={
                        <ActionPanel>
                            <Action title="toggle detail" onAction={() => setIsShowDetail(!isShowDetail)} />
                            <Action title="toggle meta data" onAction={() => setIsShowMeta(!isShowMeta)} />
                            <Action.OpenInBrowser url={article.link} />
                        </ActionPanel>
                    }
                    detail={
                        <List.Item.Detail
                            markdown={article.content}
                            metadata={
                                isShowMeta ?
                                    <List.Item.Detail.Metadata>
                                        <List.Item.Detail.Metadata.Label title='TITLE' text={article.title} />
                                        <List.Item.Detail.Metadata.Separator />
                                        <List.Item.Detail.Metadata.Label title='pubDate' text={article.pubDate} />
                                        <List.Item.Detail.Metadata.Label title='iosDate' text={article.isoDate} />
                                    </List.Item.Detail.Metadata>:null
                            }
                        />
                    }
                />
            })}
        </List>
    )
}