import { IconEyeClose, IconEyeOpen } from 'components/icons';
import React, { useState } from 'react';
import Input from './Input';

const InputPasswordToggle = ({control}) => {
    const [hiddenPassword, setHiddenPassword] = useState(true);
    return (
        <>
            <Input
            type={hiddenPassword ? "password" : "text"}
            name="password"
            placeholder="Please enter your password"
            control={control}
          >
            {hiddenPassword ? (
              <IconEyeClose
                onClick={(e) => setHiddenPassword(false)}
              ></IconEyeClose>
            ) : (
              <IconEyeOpen
                onClick={(e) => setHiddenPassword(true)}
              ></IconEyeOpen>
            )}
          </Input>
        </>
    );
};

export default InputPasswordToggle;