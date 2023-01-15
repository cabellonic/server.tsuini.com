import { Song } from '../../models';

export interface Playlist {
	collaborative: boolean;
	description: string;
	spotifyUrl: string;
	followers: number;
	id: string;
	images: Array<string>;
	name: string;
	owner: {
		id: string;
		name: string;
	};
	public: boolean;
	songs?: Array<Song & { added_at: string; added_by: string }>;
	total_songs: number;
}

export interface NewPlaylistEntry {
	name: string;
	public: boolean;
	collaborative: boolean;
	description: string;
}
