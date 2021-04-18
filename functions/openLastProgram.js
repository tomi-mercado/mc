import open from 'opn';

import getChannelDetailsById from './getChannelDetailsById.js';
import getPlaylistItemsById from './getPlaylistItemsById.js';

const openLastProgram = async (channelId, keywords) => {
    const channelDetails = await getChannelDetailsById(channelId);
    const playlistId = channelDetails.data.items[0].contentDetails.relatedPlaylists.uploads;
    const playlistItems = await getPlaylistItemsById(playlistId);
    const { items: allVideos } = playlistItems.data;
    const programs = allVideos.filter((video) => {
        const videoTitle = video.snippet.title;
        return keywords.reduce((result, currentKeyword) => {
            if (!result) {
                return result;
            }
            return videoTitle.includes(currentKeyword);
        }, true)
    })
    .map((video) => ({
        name: video.snippet.title,
        publishedAt: video.snippet.publishedAt,
        link: `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`,
    }))
    .sort((a, b) => new Date(a.publishedAt) < new Date(b.publishedAt) ? 1 : -1);
    const lastProgram = programs[0];
    open(lastProgram.link);
}

export default openLastProgram;
