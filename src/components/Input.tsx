import React, { FunctionComponent } from 'react';
import { Autocomplete, styled, TextField } from '@mui/material';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete';

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

const Input: FunctionComponent = () => {
    const {
        ready,
        value,
        setValue,
        suggestions: { data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    const handleSelect = async (address: string) => {
        const geocode = await getGeocode({ address });
        const { lat, lng } = await getLatLng(geocode[0]);

        console.log({
            lat,
            lng,
        });
    };

    const onChangeHandler = (selectedValue: string | null) => {
        if (selectedValue) {
            handleSelect(selectedValue);
        }
    };

    return (
        <Autocomplete
            options={data.map(item => item.description)}
            clearOnEscape
            disabled={!ready}
            onClose={() => {
                clearSuggestions();
                setValue('');
            }}
            onChange={(e, newValue) => onChangeHandler(newValue)}
            popupIcon=''
            renderInput={(params) => (
                <StyledTextField
                    {...params}
                    value={value}
                    label='Search something'
                    onChange={(e) => setValue(e.target.value)}
                />
            )}
        />
    );
};

export default Input;
