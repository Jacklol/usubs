export class user{
	
}
export interface VideoSearch{
   etag: string;
   items: Array<video>;
   kind:string;

}
export interface video{
	etag:string;
	id:id;
}
export interface id{
	kind:string;
	videoId:string;
}