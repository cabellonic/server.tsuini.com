import axios from 'axios';
// Adapter
import * as authAdapter from './auth.adapter';
// Utils
import * as utils from '../../utils';

export const getUserFromSpotify = async (accessToken: string) => {
	const config = utils.getAxiosConfig({ accessToken });

	const { data } = await axios.get('https://api.spotify.com/v1/me', config);
	return authAdapter.adaptUserFromSpotify(data);
};
