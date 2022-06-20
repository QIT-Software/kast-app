import React, {useEffect, useState} from 'react';
import {useSelector} from 'state/hooks';
import classNames from 'classnames';
import {useStyles} from './Referral.style';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import userReferralsLogo from 'routes/main/UserProfile/assets/userReferralsLogo.svg';
import {
  useReferrersActions,
  useRouterActions,
  useUserProfileActions,
} from 'state/hooks/UseActions';
import {Hidden} from '@material-ui/core';
import {TreeView} from '@material-ui/lab';
import TreeItem from '@material-ui/lab/TreeItem';
import Skeleton from '@material-ui/lab/Skeleton';
import Avatar from '@material-ui/core/Avatar';
import User from 'entities/User';
import UserSecondLevelReferrers from './components/UserSecondLevelReferrers/UserSecondLevelReferrers';
import {RequireLoadable} from 'components';
import {MoreInfo} from 'routes/main/User/assets';

export type StyledTreeItemProps = {
  nodeId: string;
  bgColor?: string;
  color?: string;
  labelInfo?: string;
  labelText?: string;
  labelIcon?: any;
  avatarUrl?: string;
  level?: string;
};

const Referral = () => {
  const referrers = useSelector((state) => state.userReferrers);
  const user = useSelector((state) => state.userProfile);
  const classes = useStyles();
  const actions = useReferrersActions();
  const userActions = useUserProfileActions();
  const routerActions = useRouterActions();
  // const history = useHistory();

  const [userReferrers, getUserReferrers] = useState<User[]>([]);
  const refs: User[] = [];
  if (referrers.isSuccess) {
    refs.concat(referrers.userReferrers);
  }

  const gerRefs = () => {
    if (referrers.isSuccess) {
      referrers.userReferrers.forEach((ref) => {
        if (user.isSuccess) {
          if (ref.referrer?.id) {
            if (ref.referrer.id === user.id)
              getUserReferrers((prevState) => [...prevState, ref]);
          }
        }
      });
    }
  };

  useEffect(() => {
    gerRefs();

    userActions.fetchUserProfile();
    actions.fetchReferrers();
  }, []);

  // const StyledTreeItem = (props: StyledTreeItemProps) => {
  //   const {labelText, labelInfo, color, bgColor, avatarUrl, level, ...other} = props;
  //
  //   return (
  //     <TreeItem
  //       label={
  //         <div className={classes.labelRoot}>
  //           <Avatar className={classes.avatarIcon} alt={labelText} src={avatarUrl} />
  //           <div className={classes.infoContainer}>
  //             <div className={classes.infoMain}>
  //               <Typography variant="body2" className={classes.labelText}>
  //                 {labelText}
  //               </Typography>
  //               <Skeleton
  //                 variant="circle"
  //                 width={15}
  //                 height={15}
  //                 className={level}
  //                 animation={false}
  //               />
  //             </div>
  //             <Typography className={classes.labelInfo}>{labelInfo}</Typography>
  //           </div>
  //         </div>
  //       }
  //       style={{
  //         // @ts-ignore
  //         '--tree-view-color': color,
  //         '--tree-view-bg-color': bgColor,
  //       }}
  //       {...other}
  //     />
  //   );
  // };

  return (
    <Box className={classes.rootMain}>
      <Box className={classes.treeContainer}>
        <Box className={classes.levelContainer}>
          <span className={classes.levelInner}>
            <Skeleton
              variant="circle"
              width={20}
              height={20}
              className={classes.circleRed}
              animation={false}
            />
            <Typography className={classNames(classes.levelTitle, classes.Red)}>
              First level
            </Typography>
          </span>
          <span className={classes.levelInner}>
            <Skeleton
              variant="circle"
              width={20}
              height={20}
              className={classes.circleGreen}
              animation={false}
            />
            <Typography className={classNames(classes.levelTitle, classes.Green)}>
              Second level
            </Typography>
          </span>
          <span className={classes.levelInner}>
            <Skeleton
              variant="circle"
              width={20}
              height={20}
              className={classes.circleBlue}
              animation={false}
            />
            <Typography className={classNames(classes.levelTitle, classes.Blue)}>
              Third level
            </Typography>
          </span>
        </Box>
        <TreeView
          className={classes.root}
          disableSelection
          // defaultEndIcon={<div style={{width: 24}} />}
        >
          {userReferrers.map((ref) => {
            return (
              <TreeItem
                nodeId={ref.id}
                className={classes.firstLevel}
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
                          className={classes.circleRed}
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
              >
                <>
                  <div className={classes.marginTop}> </div>
                  <RequireLoadable data={referrers}>
                    {(data) => {
                      return (
                        <UserSecondLevelReferrers
                          id={ref.id}
                          referrers={data.userReferrers}
                        />
                      );
                    }}
                  </RequireLoadable>
                </>
              </TreeItem>
            );
          })}
        </TreeView>
      </Box>
      <Hidden only={['xs', 'sm']}>
        <Paper className={classes.paperRoot} elevation={0}>
          <Typography gutterBottom variant="h4" component="h2">
            Referral program
          </Typography>
          <CardMedia
            className={classes.media}
            image={userReferralsLogo}
            title="Contemplative Reptile"
          />
        </Paper>
      </Hidden>
    </Box>
  );
};

export default Referral;
