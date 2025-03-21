export interface User {
  id: number; // 1;
  firstName: string; // 'Maria';
  lastName: string; // 'Julia';
  username: string; //'mariajulia';
  email: string; //'mariajulia@coffstack.com';
  profileUrl: string; // 'https://nubble-development.s3.sa-east-1.amazonaws.com/backend-integration/1-maria.png';
  isOnline: boolean; // false;
  fullName: string; // 'Maria Julia';
  meta: {
    followingCount: string; // '0';
    followersCount: string; // '0';
  };
}

export interface UserDetails extends User {
  isFollowing: boolean;
}

export type UpdateUserParams = Partial<
  Pick<User, 'firstName' | 'lastName' | 'username'>
>;
export interface UserAPI {
  id: number; // 1;
  first_name: string; // 'Maria';
  last_name: string; // 'Julia';
  username: string; //'mariajulia';
  email: string; //'mariajulia@coffstack.com';
  profile_url: string; // 'https://nubble-development.s3.sa-east-1.amazonaws.com/backend-integration/1-maria.png';
  is_online: boolean; // false;
  full_name: string; // 'Maria Julia';
  meta: {
    following_count: string; // '0';
    followers_count: string; // '0';
  };
}
