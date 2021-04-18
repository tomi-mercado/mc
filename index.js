#! node
const Youtube = require("youtube-api");
const open = require('opn');
require('dotenv').config()

const masterChefId = 'UCsf7o62bd1t0zy8csOPm1xg';

const getChannelDetailsById = (id) => Youtube.channels.list({
    part: 'contentDetails',
    maxResults: 50,
    chart: 'mostPopular',
    id,
    auth: process.env.YOUTUBE_API_KEY,
});

const getPlaylistItemsById = (id) => Youtube.playlistItems.list({
    part: 'snippet',
    playlistId: id,
    maxResults: 50,
    auth: process.env.YOUTUBE_API_KEY,
});

(async () => {
    const channelDetails = await getChannelDetailsById(masterChefId);
    const playlistId = channelDetails.data.items[0].contentDetails.relatedPlaylists.uploads;
    const playlistItems = await getPlaylistItemsById(playlistId);
    const { items: allVideos } = playlistItems.data;
    const programs = allVideos.filter((video) => {
        const videoTitle = video.snippet.title;
        return videoTitle.includes('MasterChef Argentina 2021') && videoTitle.includes('Programa');
    })
    .map((video) => ({
        name: video.snippet.title,
        publishedAt: video.snippet.publishedAt,
        link: `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`,
    }))
    .sort((a, b) => new Date(a.publishedAt) < new Date(b.publishedAt) ? 1 : -1);
    const lastProgram = programs[0];
    open(lastProgram.link);
})()
