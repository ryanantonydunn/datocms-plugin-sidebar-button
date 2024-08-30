import { RenderItemFormSidebarPanelCtx } from "datocms-plugin-sdk";
import { Button, Canvas, Spinner } from "datocms-react-ui";
import { useState } from "react";
import { Params } from "./ConfigScreen";

type Props = {
  ctx: RenderItemFormSidebarPanelCtx;
};

export default function SidebarPanel({ ctx }: Props) {
  const params = ctx.plugin.attributes.parameters as Params;

  const [isLoading, setIsLoading] = useState(false);
  async function send() {
    setIsLoading(true);
    try {
      const headers: { [key: string]: string } = {};
      if (params.validationHeaderName && params.validationHeaderValue) {
        headers[params.validationHeaderName] = params.validationHeaderValue;
      }
      const res = await fetch(params.url, {
        method: "POST",
        headers,
        body: JSON.stringify(ctx.item),
      });
      if (res.ok) {
        ctx.notice("Sent successfully");
      } else {
        ctx.alert("Response from URL was unsuccessful");
      }
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      ctx.alert("Error calling the URL");
      setIsLoading(false);
    }
  }

  return (
    <Canvas ctx={ctx}>
      <Button
        buttonType="primary"
        fullWidth
        disabled={isLoading}
        onClick={() => {
          send();
        }}
      >
        {params.label}
        {isLoading && <Spinner size={24} placement="centered" />}
      </Button>
    </Canvas>
  );
}
