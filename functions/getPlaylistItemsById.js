import Youtube from 'youtube-api';

const getPlaylistItemsById = (id) => Youtube.playlistItems.list({
    part: 'snippet',
    playlistId: id,
    maxResults: 50,
    auth: process.env.YOUTUBE_API_KEY,
});

export default getPlaylistItemsById;
