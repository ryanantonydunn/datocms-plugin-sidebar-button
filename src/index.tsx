import { connect, IntentCtx, ItemType } from "datocms-plugin-sdk";
import "datocms-react-ui/styles.css";
import ConfigScreen, { Params } from "./entrypoints/ConfigScreen";
import { render } from "./utils/render";
import SidebarPanel from "./entrypoints/SidebarPanel";

connect({
  renderConfigScreen(ctx) {
    return render(<ConfigScreen ctx={ctx} />);
  },
  itemFormSidebarPanels(itemType: ItemType, ctx: IntentCtx) {
    const params = ctx.plugin.attributes.parameters as Params;
    const isOnThisModel = params.models.find(
      ({ value }) => value === itemType.id
    );
    if (isOnThisModel) {
      return [
        {
          id: "buttonSection",
          label: params.sectionLabel,
          startOpen: true,
        },
      ];
    } else {
      return [];
    }
  },
  renderItemFormSidebarPanel(sidebarPaneId, ctx) {
    render(<SidebarPanel ctx={ctx} />);
  },
});
