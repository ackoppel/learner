import React, { useContext, useState } from "react";
import { FormRow } from "../../../components/form/row/formRow";
import { AuthContext } from "../../../components/auth/AuthContext";
import { FormButton } from "../../../components/form/button/formButton";

export interface IFormValues {
  displayName: string;
  gender: string;
  description: string;
}

interface IProps {
  onUpdate: (values: IFormValues) => Promise<void>;
}

export const SettingsProfileEditForm: React.FC<IProps> = ({ onUpdate }) => {
  const [error, setError] = useState<string | null>(null);
  const { profile } = useContext(AuthContext);

  const [values, setValues] = useState<IFormValues>({
    displayName: "",
    gender: "",
    description: "",
  });

  return (
    <form
      className="settings-profile"
      onSubmit={async (e) => {
        e.preventDefault();
        if (values.description.length > 2000) {
          setError("Description must be shorter than 2000 characters.");
          return;
        }
        if (values.gender !== "male" && values.gender !== "female") {
          setError("Gender must be male or female");
          return;
        }
        await onUpdate(values);
      }}
    >
      <p>{profile && profile.username}</p>
      <FormRow
        type="text"
        placeholder="Display Name"
        value={values.displayName}
        onChange={(displayName) =>
          setValues((prev) => ({ ...prev, displayName }))
        }
        size="large"
      />
      <FormRow
        type="text"
        placeholder="Gender"
        value={values.gender}
        onChange={(gender) => setValues((prev) => ({ ...prev, gender }))}
        size="large"
      />
      <FormRow
        type="text"
        placeholder="Description"
        value={values.description}
        onChange={(description) =>
          setValues((prev) => ({ ...prev, description }))
        }
        size="large"
      />
      <FormButton text="Update" type="submit" size="large" />
      {error && <p>{error}</p>}
    </form>
  );
};
