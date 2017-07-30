
export interface VideoSearchBase{
	etag: string;
	items: Array<Video>;
	kind:string;
	videoInfo:videoInfo;
}
export interface videoInfo{
	items:string;
}
export interface Video{
	etag:string;
	id:Id;
	kind:string
}
export interface Id{
	kind:string;
	videoId:string;
	snippet:Snippet;
}
export interface Snippet{
	channelId:string;
	channelTitle:string;
	description:string;
	publishedAt:string;
	thumbnails:Thumbnails1;
}
export interface Default{
	url:string;
}
export interface Thumbnails1{
	default:Default;
}
