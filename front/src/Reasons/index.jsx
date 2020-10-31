import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  withStyles,
} from '@material-ui/core';
import React from 'react';

export default function Reasons({ reason, onChange: handleChange }) {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Raison du déplacement</FormLabel>
      <RadioGroup
        aria-label="raison"
        name="reason"
        value={reason}
        onChange={({ target: { value } }) => handleChange(value)}
      >
        <ReasonFormControlLabel value="work" label="Travail" />
        <ReasonFormControlLabel value="shopping" label="Achats" />
        <ReasonFormControlLabel value="sport" label="Sport / promenade" />
        <ReasonFormControlLabel value="children" label="Enfants" />
        <ReasonFormControlLabel value="health" label="Santé" />
        <ReasonFormControlLabel value="familyAssistance" label="Familiale" />
        <ReasonFormControlLabel value="handicap" label="Handicap" />
        <ReasonFormControlLabel
          value="legal"
          label="Convocation judiciaire ou administrative"
        />
        <ReasonFormControlLabel
          value="mandatoryMissions"
          label="Mission d'intérêt général"
        />
      </RadioGroup>
    </FormControl>
  );
}

const ReasonFormControlLabel = withStyles({
  root: {
    textAlign: 'left',
  },
})((props) => <FormControlLabel control={<Radio />} {...props} />);
