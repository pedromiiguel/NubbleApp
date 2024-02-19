import {useEffect, useState} from 'react';

import {QueryKeys} from '@infra';
import {useInfiniteQuery} from '@tanstack/react-query';

import {CameraRollService} from './cameraRollService';

export function useCameraRoll(
  hasPermission: boolean,
  onInitiallLoad?: (imageUrl: string) => void,
) {
  const [list, setList] = useState<string[]>([
    'file:///storage/emulated/0/DCIM/Camera/IMG_20240131_172706.jpg',
  ]);

  const query = useInfiniteQuery({
    queryKey: [QueryKeys.CameraRollList],
    queryFn: ({pageParam}) => CameraRollService.getPhotos(pageParam),
    getNextPageParam: ({cursor}) => cursor,
    enabled: hasPermission,
  });

  function fetchNextPage() {
    if (hasPermission) {
      query.fetchNextPage();
    }
  }

  useEffect(() => {
    if (query.data) {
      const newList = query.data.pages.reduce<string[]>((prev, curr) => {
        return [...prev, ...curr.photoList];
      }, []);
      setList(newList);

      if (query.data.pages.length === 1 && onInitiallLoad) {
        onInitiallLoad(newList[0]);
      }
    }
  }, [query.data, onInitiallLoad]);

  return {
    photoList: list,
    hasNextPage: query.hasNextPage,
    fetchNextPage,
  };
}
