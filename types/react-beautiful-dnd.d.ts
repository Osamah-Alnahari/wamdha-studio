declare module "react-beautiful-dnd" {
  import * as React from "react"

  export type DraggableId = string
  export type DroppableId = string
  export type DraggableLocation = {
    droppableId: DroppableId
    index: number
  }
  export type DraggableStyle = {
    position: string
    width: number
    height: number
    top: number
    left: number
    transform?: string
    transition?: string
    pointerEvents?: string
  }
  export type DraggableStateSnapshot = {
    isDragging: boolean
    isDropAnimating: boolean
    dropAnimation?: {
      duration: number
      curve: string
      moveTo: {
        x: number
        y: number
      }
    }
    draggingOver?: DroppableId
    combineWith?: DraggableId
    combineTargetFor?: DraggableId
    mode?: string
  }
  export type DroppableStateSnapshot = {
    isDraggingOver: boolean
    draggingOverWith?: DraggableId
    draggingFromThisWith?: DraggableId
  }
  export type DraggableProvided = {
    draggableProps: {
      style?: DraggableStyle
      "data-rbd-draggable-context-id": string
      "data-rbd-draggable-id": string
      onTransitionEnd?: (event: React.TransitionEvent<HTMLElement>) => void
    }
    dragHandleProps?: {
      "data-rbd-drag-handle-draggable-id": string
      "data-rbd-drag-handle-context-id": string
      "aria-describedby": string
      role: string
      tabIndex: number
      draggable: boolean
      onDragStart: (event: React.DragEvent<HTMLElement>) => void
    }
    innerRef: (element?: HTMLElement | null) => void
  }
  export type DroppableProvided = {
    innerRef: (element?: HTMLElement | null) => void
    placeholder?: React.ReactElement<HTMLElement> | null
    droppableProps: {
      "data-rbd-droppable-id": string
      "data-rbd-droppable-context-id": string
    }
  }
  export type DraggableRubric = {
    draggableId: DraggableId
    type: string
    source: DraggableLocation
  }
  export type DropResult = {
    draggableId: DraggableId
    type: string
    source: DraggableLocation
    destination?: DraggableLocation
    reason: "DROP" | "CANCEL"
    mode: "FLUID" | "SNAP"
    combine?: {
      draggableId: DraggableId
      droppableId: DroppableId
    }
  }
  export type ResponderProvided = {
    announce: (message: string) => void
  }
  export type OnBeforeCaptureResponder = (before: DraggableRubric) => void
  export type OnBeforeDragStartResponder = (start: DraggableRubric) => void
  export type OnDragStartResponder = (start: DraggableRubric, provided: ResponderProvided) => void
  export type OnDragUpdateResponder = (
    update: {
      draggableId: DraggableId
      type: string
      source: DraggableLocation
      destination?: DraggableLocation
      combine?: {
        draggableId: DraggableId
        droppableId: DroppableId
      }
      mode: "FLUID" | "SNAP"
    },
    provided: ResponderProvided,
  ) => void
  export type OnDragEndResponder = (result: DropResult, provided: ResponderProvided) => void

  export interface DragDropContextProps {
    onBeforeCapture?(before: DraggableRubric): void
    onBeforeDragStart?(initial: DraggableRubric): void
    onDragStart?(initial: DraggableRubric, provided: ResponderProvided): void
    onDragUpdate?(
      update: {
        draggableId: DraggableId
        type: string
        source: DraggableLocation
        destination?: DraggableLocation
        combine?: {
          draggableId: DraggableId
          droppableId: DroppableId
        }
        mode: "FLUID" | "SNAP"
      },
      provided: ResponderProvided,
    ): void
    onDragEnd(result: DropResult, provided: ResponderProvided): void
    children: React.ReactNode
    dragHandleUsageInstructions?: string
    nonce?: string
    enableDefaultSensors?: boolean
    sensors?: any[]
  }

  export interface DraggableProps {
    draggableId: string
    index: number
    children(provided: DraggableProvided, snapshot: DraggableStateSnapshot): React.ReactNode
    isDragDisabled?: boolean
    disableInteractiveElementBlocking?: boolean
    shouldRespectForcePress?: boolean
  }

  export interface DroppableProps {
    droppableId: string
    type?: string
    mode?: "standard" | "virtual"
    isDropDisabled?: boolean
    isCombineEnabled?: boolean
    direction?: "horizontal" | "vertical"
    ignoreContainerClipping?: boolean
    renderClone?: (
      provided: DraggableProvided,
      snapshot: DraggableStateSnapshot,
      rubric: DraggableRubric,
    ) => React.ReactNode
    getContainerForClone?: () => HTMLElement
    children(provided: DroppableProvided, snapshot: DroppableStateSnapshot): React.ReactNode
  }

  export class DragDropContext extends React.Component<DragDropContextProps> {}
  export class Droppable extends React.Component<DroppableProps> {}
  export class Draggable extends React.Component<DraggableProps> {}
}
