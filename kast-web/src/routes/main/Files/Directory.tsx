import React, {useEffect, useState} from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import filesAndFoldersLogo from './assets/filesAndFoldersLogo.svg';
import {useStyles} from './Directory.style';
import {RequireLoadable} from '../../../components';
import {Hidden, Button, IconButton, MenuItem, Menu} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import {useSelector} from 'state/hooks';
import {useTranslation} from 'react-i18next';
import {Route, useHistory, useLocation} from 'react-router-dom';
import UploadFileDialog from 'routes/main/Files/UploadFileDialog/UploadFileDialog';
import {useFilesActions} from 'state/hooks/UseActions';
import AddDirectoryDialog from 'routes/main/Files/AddDirectoryDialog/AddDirectoryDialog';
import {stringifyUrl, parse} from 'query-string';
import {AvikastDirectory, AvikastFile} from 'entities/AvikastFiles';
import remove from './assets/remove.svg';

const Directory: React.FC = () => {
  const classes = useStyles();
  const state = useSelector((state) => state.files);
  const {t} = useTranslation('files');
  const history = useHistory();
  const actions = useFilesActions();
  const location = useLocation();
  const {parent} = parse(location.search);

  const [directoryName, setDirectoryName] = useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // eslint-disable-next-line no-console
  console.log('in directory ', directoryName);
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    actions.fetchFiles(parent as string | undefined);
  }, [parent]);

  const FileButton = ({file}: {file: AvikastFile}) => {
    const {name} = file;
    return (
      <div className={classes.fileButtonWrapper}>
        <Button href={file.fileUrl} target="_blank" className={classes.fileButton}>
          <InsertDriveFileIcon fontSize="large" className={classes.icon} />
          <span className={classes.fileName}>{name}</span>
          <Box>
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                actions.deleteFile(file.id, parent as string | undefined);
              }}
            >
              <img src={remove} alt="" className={classes.replyIcon} />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <span>{t('sendToChat')}</span>
              </MenuItem>
            </Menu>
          </Box>
        </Button>
      </div>
    );
  };

  const DirectoryButton = ({file: {id, name}}: {file: AvikastDirectory}) => {
    return (
      <div className={classes.fileButtonWrapper}>
        <Button
          onClick={() => {
            history.push(stringifyUrl({url: '/files', query: {parent: id}}));
          }}
          className={classes.fileButton}
        >
          <FolderIcon fontSize="large" className={classes.icon} />
          <Typography className={classes.fileName}>{name}</Typography>
          <Box>
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={() => {
                actions.deleteDirectory(id, parent as string | undefined);
              }}
            >
              <img src={remove} alt="" className={classes.replyIcon} />
            </IconButton>
          </Box>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <span>{t('sendToChat')}</span>
            </MenuItem>
          </Menu>
        </Button>
      </div>
    );
  };

  return (
    <Box className={classes.root}>
      <Hidden only={['xs', 'sm']}>
        <Paper className={classes.paperRoot} elevation={0}>
          <Typography gutterBottom variant="h4" component="h2">
            {t('keepYourFiles')}
            <br />
            {t('together')}
          </Typography>
          <CardMedia
            className={classes.media}
            image={filesAndFoldersLogo}
            title="Contemplative Reptile"
          />
        </Paper>
      </Hidden>

      <RequireLoadable data={state}>
        {(files) => {
          return (
            <Box className={classes.filesWrapper}>
              <span>
                <Button
                  className={classes.filesUploadContainer}
                  onClick={() => {
                    history.push(
                      stringifyUrl({url: '/files/upload-file', query: {parent}}),
                    );
                  }}
                >
                  Upload file
                </Button>
                <Button
                  className={classes.filesUploadContainer}
                  onClick={() => {
                    history.push(
                      stringifyUrl({url: '/files/add-directory', query: {parent}}),
                    );
                  }}
                >
                  Create directory
                </Button>
              </span>
              <Box className={classes.filesAndFoldersSection}>
                <Typography
                  className={classes.head}
                  gutterBottom
                  variant="h4"
                  component="h1"
                >
                  {t('folders')}
                </Typography>
                <Box className={classes.filesContainer}>
                  {files.directories.map((file) => {
                    setDirectoryName(file.name);
                    return <DirectoryButton key={file.id} file={file} />;
                  })}
                </Box>
                <Typography
                  className={classes.head}
                  gutterBottom
                  variant="h4"
                  component="h1"
                >
                  {t('files')}
                </Typography>
                <Box className={classes.filesContainer}>
                  {files.files.map((file) => (
                    <FileButton key={file.id} file={file} />
                  ))}
                </Box>
              </Box>
            </Box>
          );
        }}
      </RequireLoadable>
      <Route path="/files/upload-file">
        <UploadFileDialog open onClose={() => history.goBack()} />
      </Route>
      <Route path="/files/add-directory">
        <AddDirectoryDialog open onClose={() => history.goBack()} />
      </Route>
    </Box>
  );
};

export default Directory;
