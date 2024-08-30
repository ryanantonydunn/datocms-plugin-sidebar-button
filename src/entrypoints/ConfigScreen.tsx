import type { RenderConfigScreenCtx } from "datocms-plugin-sdk";
import {
  Button,
  Canvas,
  FieldGroup,
  Form,
  SelectField,
  TextField,
} from "datocms-react-ui";
import { useState } from "react";

type Props = {
  ctx: RenderConfigScreenCtx;
};

type ModelOption = { label: string; value: string };

export type Params = {
  sectionLabel: string;
  url: string;
  label: string;
  models: ModelOption[];
  validationHeaderName: string;
  validationHeaderValue: string;
};

export default function ConfigScreen({ ctx }: Props) {
  const params = ctx.plugin.attributes.parameters as Params;

  const [form, setForm] = useState({ ...params });
  const isIdentical = JSON.stringify(form) === JSON.stringify(params);

  const handleSubmit = () => {
    ctx.updatePluginParameters(form);
    ctx.notice("Settings updated successfully!");
  };

  return (
    <Canvas ctx={ctx}>
      <Form onSubmit={handleSubmit}>
        <FieldGroup>
          <SelectField
            required
            name="models"
            id="models"
            label="Model"
            hint="Choose which models to show the button on"
            value={form.models}
            selectInputProps={{
              isMulti: true,
              options: Object.values(ctx.itemTypes)
                .filter((i) => i !== undefined)
                .map((i) => ({
                  label: i?.attributes.name || "",
                  value: i?.id || "",
                })),
            }}
            onChange={(models) => {
              setForm((f) => ({ ...f, models: models as ModelOption[] }));
            }}
          />
          <TextField
            required
            name="sectionLabel"
            id="sectionLabel"
            label="Section Label"
            value={form.sectionLabel}
            onChange={(sectionLabel) => {
              setForm((f) => ({ ...f, sectionLabel }));
            }}
          />
          <TextField
            required
            name="url"
            id="url"
            label="URL"
            value={form.url}
            onChange={(url) => {
              setForm((f) => ({ ...f, url }));
            }}
          />
          <TextField
            required
            name="label"
            id="label"
            label="Button Label"
            value={form.label}
            onChange={(label) => {
              setForm((f) => ({ ...f, label }));
            }}
          />
        </FieldGroup>
        <FieldGroup>
          <h4>Headers</h4>
          <p style={{ fontSize: "0.9em" }}>
            These values will set a header and its value on the request sent by
            the button, to be used to validate that any requests came from here.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ width: "100%" }}>
              <TextField
                name="validationHeaderName"
                id="validationHeaderName"
                label="Validation Header Name"
                value={form.validationHeaderName}
                onChange={(validationHeaderName) => {
                  setForm((f) => ({ ...f, validationHeaderName }));
                }}
              />
            </div>
            <div style={{ width: "100%" }}>
              <TextField
                name="validationHeaderValue"
                id="validationHeaderValue"
                label="Validation Header Value"
                value={form.validationHeaderValue}
                onChange={(validationHeaderValue) => {
                  setForm((f) => ({ ...f, validationHeaderValue }));
                }}
              />
            </div>
          </div>
        </FieldGroup>
        <FieldGroup>
          <Button type="submit" disabled={isIdentical}>
            Save Settings
          </Button>
        </FieldGroup>
      </Form>
    </Canvas>
  );
}
