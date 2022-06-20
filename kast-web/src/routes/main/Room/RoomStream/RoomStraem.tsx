import React, {useEffect} from 'react';
import {RoomType} from 'entities/Room';
import Meeting from 'routes/main/Room/RoomStream/Meeting/Meeting';
import {useSelector} from 'state/hooks';
import {useRoomActions} from 'state/hooks/UseActions';
import RequireLoadable from 'components/Loadable/RequireLoadable';

interface RoomStreamProps {
  roomId: string;
  userId: string;
  userName: string;
}

const RoomStream: React.FC<RoomStreamProps> = ({roomId, userId, userName}) => {
  const roomActions = useRoomActions();
  useEffect(() => {
    roomActions.fetchRoom(roomId);
  }, []);
  const state = useSelector((state) => state.room);
  return (
    <RequireLoadable data={state}>
      {(room) => (
        <Meeting
          roomId={roomId}
          type={room.data.type || RoomType.Meeting}
          sessionUserId={userId}
          sessionUserName={userName}
          roomUserId={room.data.user.id}
          inviteLink={room.data.inviteLink}
          closed={room.data.closed}
        />
      )}
    </RequireLoadable>
  );
};
export default RoomStream;
