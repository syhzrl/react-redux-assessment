import React, { FunctionComponent } from 'react';
import { Dialog, List, ListItem } from '@mui/material';
import { Close } from '@mui/icons-material';

import styles from './modal.module.css';

interface ModalProps {
    isOpen: boolean;
    handleClose: (state: boolean) => void;
}

const Modal: FunctionComponent<ModalProps> = (props: ModalProps) => {
    const { isOpen, handleClose } = props;

    return (
        <Dialog
            open={isOpen}
            maxWidth='md'
            fullWidth
            onClose={handleClose}
        >
            <div className={styles['main-container']}>
                <div className={styles['header-container']}>
                    <h1>
                        Personal Feedback
                    </h1>

                    <button
                        className={styles['close-button']}
                        onClick={() => handleClose(false)}
                    >
                        <Close />
                    </button>
                </div>

                <div className={styles['list-container']}>
                    <h2>
                        Things I would change:
                    </h2>

                    <List>
                        <ListItem>
                            Use NextJS or Vite instead of CRA.
                        </ListItem>

                        <ListItem>
                            Use Tailwind instead of relying on Material UI
                        </ListItem>

                        <ListItem>
                            Drop Redux Saga in favour of Tanstack Query for data fetching
                        </ListItem>
                    </List>
                </div>

                <div className={styles['list-container']}>
                    <h2>
                        Things I would keep:
                    </h2>

                    <List>
                        <ListItem>
                            Typescript
                        </ListItem>

                        <ListItem>
                            Eslint
                        </ListItem>
                    </List>
                </div>
            </div>
        </Dialog>
    );
};

export default Modal;
