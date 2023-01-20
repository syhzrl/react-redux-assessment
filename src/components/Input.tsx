import React, { FunctionComponent } from 'react';
import { Autocomplete, styled, TextField } from '@mui/material';
import usePlacesAutocomplete from 'use-places-autocomplete';

import { connect } from 'react-redux';
import Actions from '../redux/Actions';
import { AppDispatch } from '../redux/store';

import colours from '../assets/themes/colours';

import './input.css';

const StyledTextField = styled(TextField)({
    '& label.MuiInputLabel-root': {
        color: colours.primary,
    },
    '& label.Mui-focused': {
        color: colours.secondary,
        fontSize: '18px',
    },
    '& .MuiOutlinedInput-root': {
        color: colours.textPrimary,
        '& fieldset': {
            borderColor: colours.primary,
        },
        '&:hover fieldset': {
            borderColor: colours.secondary,
        },
        '&.Mui-focused fieldset': {
            borderColor: colours.secondary,
        },
    },
});

interface InputProps {
    map: google.maps.Map | null;
    getCoords: (address: string, map: google.maps.Map) => void;
}

const Input: FunctionComponent<InputProps> = (props: InputProps) => {
    const { map, getCoords } = props;

    const {
        ready,
        value,
        setValue,
        suggestions: { data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    const onChangeHandler = (selectedValue: string | null) => {
        if (selectedValue && map) {
            getCoords(selectedValue, map);
            setValue('');
        }
    };

    return (
        <Autocomplete
            options={data.map(item => item.description)}
            clearOnEscape
            disabled={!ready}
            onClose={() => {
                clearSuggestions();
            }}
            freeSolo
            value={value}
            onInputChange={() => setValue('')}
            onChange={(e, newValue) => onChangeHandler(newValue)}
            popupIcon=''
            renderInput={(params) => (
                <StyledTextField
                    {...params}
                    label='Search address'
                    onChange={(e) => setValue(e.target.value)}
                />
            )}
        />
    );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getCoords: (address: string, map: google.maps.Map) => dispatch(Actions.getCoordsAttempt({ address, map })),
});

export default connect(null, mapDispatchToProps)(Input);
