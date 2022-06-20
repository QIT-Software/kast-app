import User from '../user/User';
import Preferences from '../user/Preferences';
export default class Account {
    user: User;
    preferences: Preferences;
    constructor(user: User, preferences: Preferences);
}
