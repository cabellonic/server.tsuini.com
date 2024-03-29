export interface CurrentlyPlayingObject {
	actions: Actions;
	context: Context;
	currently_playing_type: string;
	is_playing: boolean;
	item: Item;
	progress_ms: number;
	timestamp: number;
}

export interface PlaybackState extends CurrentlyPlayingObject {
	device: Device;
	repeat_state: string;
	shuffle_state: boolean;
}

export interface Devices {
	devices: Device[];
}

export interface Actions {
	disallows: Disallows;
}

export interface Disallows {
	resuming: boolean;
}

export interface Context {
	external_urls: ExternalUrls;
	href: string;
	type: string;
	uri: string;
}

export interface ExternalUrls {
	spotify: string;
}

export interface Device {
	id: string;
	is_active: boolean;
	is_private_session: boolean;
	is_restricted: boolean;
	name: string;
	type: string;
	volume_percent: number;
}

export interface Item {
	album: SpotifyAlbum;
	artists: SpotifyArtist[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: ExternalIDS;
	external_urls: ExternalUrls;
	href: string;
	id: string;
	is_local: boolean;
	name: string;
	popularity: number;
	preview_url: string;
	track_number: number;
	type: string;
	uri: string;
}

export interface Image {
	height: number;
	url: string;
	width: number;
}

export interface ExternalIDS {
	isrc: string;
}

export interface SpotifyAlbum {
	album_type: string;
	artists: SpotifyArtist[];
	available_markets: string[];
	external_urls: ExternalUrls;
	href: string;
	id: string;
	images: Image[];
	name: string;
	release_date: Date;
	release_date_precision: string;
	total_tracks: number;
	type: string;
	uri: string;
}

export interface SpotifyArtist {
	external_urls: ExternalUrls;
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
}
