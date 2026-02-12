import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./schemas"
import type { DocumentActionComponent } from "sanity"

export default defineConfig({
  name: "default",
  title: "Ad Networks Hub",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, context) => {
      return prev.map((action) => {
        if (action.action === "duplicate") {
          const originalAction = action as DocumentActionComponent
          const wrappedAction: DocumentActionComponent = (props) => {
            const result = originalAction(props)
            if (result && "onHandle" in result && result.onHandle) {
              const originalHandle = result.onHandle
              return {
                ...result,
                onHandle: () => {
                  // The duplicate will be created — slug validation will prompt user to change it
                  originalHandle()
                },
              }
            }
            return result
          }
          wrappedAction.action = "duplicate"
          return wrappedAction
        }
        return action
      })
    },
  },
})

