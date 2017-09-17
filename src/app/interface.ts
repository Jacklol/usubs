export interface VideoSearchBase {
	nextPageToken: string;
	etag: string;
	items: Array<Video>;
	kind: string;
}
export interface VideoInfo {
	items: Array<snippetInfo>;
}
export interface snippetInfo {
	snippet: Snippet;
}
export interface Video {
	etag: string;
	id: Id;
	kind: string;
	videoInfo: VideoInfo;
	snippet: Snippet;
}
export interface ChannelTitle {
	channelTitle: string;
}
export interface Id {
	kind: string;
	videoId: string;
}
export interface Snippet {
	channelId: string;
	channelTitle: string;
	description: string;
	publishedAt: string;
	thumbnails: Thumbnails1;
}
export interface Default {
	url: string;
}
export interface Thumbnails1 {
	default: Default;
}
export interface GapiReason {
	body: string;
}
export interface caption_info {
	name: string;
	lang_code: string;
	lang_name: string;
}

