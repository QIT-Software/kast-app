import React, {useEffect, useState} from 'react';
import User from 'entities/User';
import refItem from 'routes/main/UserProfile/assets/refItem.svg';
import {useStyles} from 'routes/main/UserProfile/Referral/components/UserThirdLevelRefferrers/UserThirdLevelReferrers.styles';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
// import {useHistory} from 'react-router-dom';
import TreeItem from '@material-ui/lab/TreeItem';
import Skeleton from '@material-ui/lab/Skeleton';
import Avatar from '@material-ui/core/Avatar';
import {MoreInfo} from 'routes/main/User/assets';
import {useRouterActions} from 'state/hooks/UseActions';

interface UserReferrersProps {
  id: string;
  referrers: User[];
}

const UserThirdLevelReferrers: React.FC<UserReferrersProps> = ({id, referrers}) => {
  const classes = useStyles();
  const routerActions = useRouterActions();

  const [userReferrers, getUserReferrers] = useState<User[]>([]);

  const gerRefs = () => {
    referrers.forEach((ref) => {
      if (ref.referrer?.id) {
        if (ref.referrer.id === id) getUserReferrers((prevState) => [...prevState, ref]);
      }
    });
  };

  useEffect(() => {
    gerRefs();
  }, []);

  return (
    <>
      {userReferrers.length === 0 ? (
        <Typography className={classes.labelNoInfo}>
          This user has no referrers
        </Typography>
      ) : (
        userReferrers.map((ref) => {
          return (
            <>
              <CardMedia
                className={classes.mediaBefore}
                image={refItem}
                title="Contemplative Reptile"
              />
              <TreeItem
                nodeId={ref.id}
                className={classes.thirdLevel}
                label={
                  <div className={classes.labelRoot}>
                    <Avatar
                      className={classes.avatarIcon}
                      alt={ref.name}
                      src={ref.avatarUrl}
                    />
                    <div className={classes.infoContainer}>
                      <div className={classes.infoMain}>
                        <Typography variant="body2" className={classes.labelText}>
                          {ref.name}
                        </Typography>
                        <Skeleton
                          variant="circle"
                          width={15}
                          height={15}
                          className={classes.circleBlue}
                          animation={false}
                        />
                      </div>
                      <Typography className={classes.labelInfo}>
                        University Info
                      </Typography>
                      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                      <div
                        className={classes.moreInfoContainer}
                        onClick={() => routerActions.navigateToUser(ref.id)}
                      >
                        <CardMedia
                          className={classes.moreInfo}
                          image={MoreInfo}
                          title="Contemplative Reptile"
                        />
                      </div>
                    </div>
                  </div>
                }
              />
            </>
          );
        })
      )}
    </>
  );
};

export default UserThirdLevelReferrers;
