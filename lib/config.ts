export const serverPath = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;
//Add base paths
export const videoPath: string = '/video';
export const userPath: string = '/user';
export const coursePath: string = '/course';
export const youtubePath: string = '/youtube';

//Add trailing paths (URI)
export const getVideos: string = `${serverPath}${videoPath}/videos`;
export const createVideo: string = `${serverPath}${videoPath}`;

export const createUser: string = `${serverPath}${userPath}/create`;
export const loginUser: string = `${serverPath}${userPath}/login`;
export const loginSocial: string = `${serverPath}${userPath}/login/social`;
export const verifyToken: string = `${serverPath}${userPath}/verify/:token`;
export const getUserDetails: string = `${serverPath}${userPath}/details`;

export const createCourse: string = `${serverPath}${coursePath}`;
export const getCourses: string = `${serverPath}${coursePath}/courses`;

export const getYoutubeLink: string = `${serverPath}${youtubePath}/link`;
export const getYoutubeSearch: string = `${serverPath}${youtubePath}/search`;
