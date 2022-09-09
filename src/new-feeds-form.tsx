import { Feed } from './domain'
import { Form, ActionPanel, Action, List, useNavigation, showToast, Toast, Icon} from '@raycast/api'
import { saveFeeds } from './store'
import { useState } from "react";
import Parser from "rss-parser";

export default function AddFeedForm() {
    const [disable, setDisable] = useState<boolean>(false)
    return (
        <Form
            actions={
                <ActionPanel>
                    <Action.SubmitForm
                        title='Subscribe Rss Source'
                        onSubmit={async (values: Feed) => {
                            if (disable){
                                showToast({"title":"Please wait for the previous request to finish", "style": Toast.Style.Failure})
                                return
                            }
                            setDisable(true)
                            showToast({"title":"Loading", "style": Toast.Style.Success})
                            let parser = new Parser();
                            let feed = await parser.parseURL(values.url);
                            const feedItem = {
                                url: values.url,
                                title: feed.title || "No Title",
                                icon: feed.image?.url || Icon.BlankDocument,
                              };
                            console.log("feedItem", feedItem)
                            await saveFeeds(feedItem)
                            setDisable(false)
                            showToast({"title":"Success", "style": Toast.Style.Success})
                        }}
                    />
                </ActionPanel>
            }
        >
            <Form.TextField
                id="url"
                title="Rss URL"
                placeholder="Enter Rss Source Url"
            />
        </Form>
    )
}
