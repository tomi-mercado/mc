import Youtube from 'youtube-api';

const getChannelDetailsById = (id) => Youtube.channels.list({
    part: 'contentDetails',
    maxResults: 50,
    chart: 'mostPopular',
    id,
    auth: process.env.YOUTUBE_API_KEY,
});

export default getChannelDetailsById;
