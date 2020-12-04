import React from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
    input: {
        padding: theme.spacing(1),
        width: "100%"
    },

}));


export default function InputsList(props) {
    const { list, handleChange, formValid } = props
    const classes = useStyle()

    return list.map(({ name, setter, valueValid, type, select }) => {
        switch (type) {
            case "select":
                return (
                    <TextField
                        key={name}
                        error={!formValid && valueValid !== ' '}
                        label={name}
                        helperText={formValid ? ' ' : valueValid}
                        variant="outlined"
                        className={classes.input}
                        variant="outlined"
                        onChange={e => handleChange(setter, e.target.value)}
                        defaultValue=''
                        select
                    >
                        {select &&
                            select.map(elem =>
                                < MenuItem key={elem.value} value={elem.value}>
                                    {elem.label}
                                </MenuItem>
                            )
                        }
                    </TextField >
                )
            default:
                return (
                    <TextField
                        key={name}
                        error={!formValid && valueValid !== ' '}
                        label={name}
                        helperText={formValid ? ' ' : valueValid}
                        variant="outlined"
                        className={classes.input}
                        variant="outlined"
                        onChange={e => handleChange(setter, e.target.value)}
                        type={type || "text"}
                        defaultValue=''
                    />
                )
        }
    })
}
