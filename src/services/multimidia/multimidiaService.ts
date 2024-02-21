import {CameraRoll} from '@react-native-camera-roll/camera-roll';

import {ImageForUpload, PhotoListPaginated} from './multimidiaType';

async function getPhotos(cursor?: string): Promise<PhotoListPaginated> {
  const photoPage = await CameraRoll.getPhotos({
    first: 12,
    after: cursor,
  });

  const photoList = photoPage.edges.map(edge => edge.node.image.uri);

  return {
    photoList,
    cursor: photoPage.page_info.end_cursor,
    hasNextPage: photoPage.page_info.has_next_page,
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function prepareImageForUpload(imageUri: string): ImageForUpload {
  return {
    uri: 'path',
    name: 'name',
    type: 'image/jpg',
  };
}

export const multimidiaService = {
  prepareImageForUpload,
  getPhotos,
};
