
declare function noop(): void;

/**
 * INTERNAL, DO NOT USE. Code may change at any time.
 */
interface Fragment {
    key: string | null;
    first: null;
    c: () => void;
    l: (nodes: any) => void;
    h: () => void;
    m: (target: HTMLElement, anchor: any) => void;
    p: (ctx: T$$['ctx'], dirty: T$$['dirty']) => void;
    r: () => void;
    f: () => void;
    a: () => void;
    i: (local: any) => void;
    o: (local: any) => void;
    d: (detaching: 0 | 1) => void;
}
interface T$$ {
    dirty: number[];
    ctx: any[];
    bound: any;
    update: () => void;
    callbacks: any;
    after_update: any[];
    props: Record<string, 0 | string>;
    fragment: null | false | Fragment;
    not_equal: any;
    before_update: any[];
    context: Map<any, any>;
    on_mount: any[];
    on_destroy: any[];
    skip_bound: boolean;
    on_disconnect: any[];
    root: Element | ShadowRoot;
}

/**
 * Base class for Svelte components. Used when dev=false.
 */
declare class SvelteComponent {
    $$: T$$;
    $$set?: ($$props: any) => void;
    $destroy(): void;
    $on(type: any, callback: any): typeof noop;
    $set($$props: any): void;
}

declare type Props = Record<string, any>;
interface ComponentConstructorOptions<Props extends Record<string, any> = Record<string, any>> {
    target: Element | ShadowRoot;
    anchor?: Element;
    props?: Props;
    context?: Map<any, any>;
    hydrate?: boolean;
    intro?: boolean;
    $$inline?: boolean;
}
interface SvelteComponentDev$1 {
    $set(props?: Props): void;
    $on(event: string, callback: ((event: any) => void) | null | undefined): () => void;
    $destroy(): void;
    [accessor: string]: any;
}
/**
 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
 */
declare class SvelteComponentDev$1 extends SvelteComponent {
    /**
     * @private
     * For type checking capabilities only.
     * Does not exist at runtime.
     * ### DO NOT USE!
     */
    $$prop_def: Props;
    /**
     * @private
     * For type checking capabilities only.
     * Does not exist at runtime.
     * ### DO NOT USE!
     */
    $$events_def: any;
    /**
     * @private
     * For type checking capabilities only.
     * Does not exist at runtime.
     * ### DO NOT USE!
     */
    $$slot_def: any;
    constructor(options: ComponentConstructorOptions);
    $capture_state(): void;
    $inject_state(): void;
}
interface SvelteComponentTyped<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any> {
    $set(props?: Partial<Props>): void;
    $on<K extends Extract<keyof Events, string>>(type: K, callback: ((e: Events[K]) => void) | null | undefined): () => void;
    $destroy(): void;
    [accessor: string]: any;
}
/**
 * Base class to create strongly typed Svelte components.
 * This only exists for typing purposes and should be used in `.d.ts` files.
 *
 * ### Example:
 *
 * You have component library on npm called `component-library`, from which
 * you export a component called `MyComponent`. For Svelte+TypeScript users,
 * you want to provide typings. Therefore you create a `index.d.ts`:
 * ```ts
 * import { SvelteComponentTyped } from "svelte";
 * export class MyComponent extends SvelteComponentTyped<{foo: string}> {}
 * ```
 * Typing this makes it possible for IDEs like VS Code with the Svelte extension
 * to provide intellisense and to use the component like this in a Svelte file
 * with TypeScript:
 * ```svelte
 * <script lang="ts">
 * 	import { MyComponent } from "component-library";
 * </script>
 * <MyComponent foo={'bar'} />
 * ```
 *
 * #### Why not make this part of `SvelteComponent(Dev)`?
 * Because
 * ```ts
 * class ASubclassOfSvelteComponent extends SvelteComponent<{foo: string}> {}
 * const component: typeof SvelteComponent = ASubclassOfSvelteComponent;
 * ```
 * will throw a type error, so we need to separate the more strictly typed class.
 */
declare class SvelteComponentTyped<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any> extends SvelteComponentDev$1 {
    /**
     * @private
     * For type checking capabilities only.
     * Does not exist at runtime.
     * ### DO NOT USE!
     */
    $$prop_def: Props;
    /**
     * @private
     * For type checking capabilities only.
     * Does not exist at runtime.
     * ### DO NOT USE!
     */
    $$events_def: Events;
    /**
     * @private
     * For type checking capabilities only.
     * Does not exist at runtime.
     * ### DO NOT USE!
     */
    $$slot_def: Slots;
    constructor(options: ComponentConstructorOptions<Props>);
}

declare type JSONPointer = string;
declare type JSONPath = string[];
declare type JSONPrimitive = string | number | boolean | null;
declare type JSONValue = {
    [key: string]: JSONValue;
} | JSONValue[] | JSONPrimitive;
declare type JSONObject = {
    [key: string]: JSONValue;
};
declare type JSONArray = JSONValue[];
interface JSONPatchAdd {
    op: 'add';
    path: JSONPointer;
    value: JSONValue;
}
interface JSONPatchRemove {
    op: 'remove';
    path: JSONPointer;
}
interface JSONPatchReplace {
    op: 'replace';
    path: JSONPointer;
    value: JSONValue;
}
interface JSONPatchCopy {
    op: 'copy';
    path: JSONPointer;
    from: JSONPointer;
}
interface JSONPatchMove {
    op: 'move';
    path: JSONPointer;
    from: JSONPointer;
}
interface JSONPatchTest {
    op: 'test';
    path: JSONPointer;
    value: JSONValue;
}
declare type JSONPatchOperation = JSONPatchAdd | JSONPatchRemove | JSONPatchReplace | JSONPatchCopy | JSONPatchMove | JSONPatchTest;
declare type JSONPatchDocument = JSONPatchOperation[];
declare type JSONPatchOptions = {
    before?: (document: JSONValue, operation: JSONPatchOperation) => {
        document?: JSONValue;
        operation?: JSONPatchOperation;
    };
    after?: (document: JSONValue, operation: JSONPatchOperation, previousDocument: JSONValue) => JSONValue;
};
declare type RevertJSONPatchOptions = {
    before?: (document: JSONValue, operation: JSONPatchOperation, revertOperations: JSONPatchOperation[]) => {
        document?: JSONValue;
        revertOperations?: JSONPatchOperation[];
    };
};

/**
 * Apply a patch to a JSON object
 * The original JSON object will not be changed,
 * instead, the patch is applied in an immutable way
 */
declare function immutableJSONPatch(document: JSONValue, operations: JSONPatchDocument, options?: JSONPatchOptions): JSONValue;
declare function parsePath(document: JSONValue, pointer: JSONPointer): JSONPath;
declare function parseFrom(fromPointer: JSONPointer): JSONPath;

/**
 * Create the inverse of a set of json patch operations
 * @param document
 * @param operations Array with JSON patch actions
 * @param [options]
 * @return Returns the operations to revert the changes
 */
declare function revertJSONPatch(document: JSONValue, operations: JSONPatchDocument, options?: RevertJSONPatchOptions): JSONPatchDocument;

/**
 * Parse a JSON Pointer
 */
declare function parseJSONPointer(pointer: JSONPointer): string[];
/**
 * Compile a JSON Pointer
 */
declare function compileJSONPointer(path: JSONPath): JSONPointer;
/**
 * Compile a single path property from a JSONPath
 */
declare function compileJSONPointerProp(pathProp: string | number): JSONPointer;

/**
 * helper function to get a nested property in an object or array
 *
 * @return Returns the field when found, or undefined when the path doesn't exist
 */
declare function getIn(object: JSONValue, path: JSONPath): JSONValue | undefined;
/**
 * helper function to replace a nested property in an object with a new value
 * without mutating the object itself.
 *
 * @param object
 * @param path
 * @param value
 * @param [createPath=false]
 *                    If true, `path` will be created when (partly) missing in
 *                    the object. For correctly creating nested Arrays or
 *                    Objects, the function relies on `path` containing number
 *                    in case of array indexes.
 *                    If false (default), an error will be thrown when the
 *                    path doesn't exist.
 * @return Returns a new, updated object or array
 */
declare function setIn(object: JSONValue, path: JSONPath, value: JSONValue, createPath?: boolean): JSONValue;
/**
 * helper function to replace a nested property in an object with a new value
 * without mutating the object itself.
 *
 * @return  Returns a new, updated object or array
 */
declare function updateIn(object: JSONValue, path: JSONPath, callback: (value: JSONValue) => JSONValue): JSONValue;
/**
 * helper function to delete a nested property in an object
 * without mutating the object itself.
 *
 * @return Returns a new, updated object or array
 */
declare function deleteIn<T extends JSONValue>(object: T, path: JSONPath): T;
/**
 * Insert a new item in an array at a specific index.
 * Example usage:
 *
 *     insertAt({arr: [1,2,3]}, ['arr', '2'], 'inserted')  // [1,2,'inserted',3]
 */
declare function insertAt(document: JSONObject | JSONArray, path: JSONPath, value: JSONValue): JSONValue;
/**
 * Test whether a path exists in a JSON object
 * @return Returns true if the path exists, else returns false
 */
declare function existsIn(document: JSONValue, path: JSONPath): boolean;

declare type TextContent = {
    text: string;
} | {
    json: undefined;
    text: string;
};
declare type JSONContent = {
    json: JSONValue;
} | {
    json: JSONValue;
    text: undefined;
};
declare type Content = JSONContent | TextContent;
declare type JSONParser = JSON;
interface JSONPathParser {
    parse: (pathStr: any) => JSONPath;
    stringify: (path: JSONPath) => string;
}
interface VisibleSection {
    start: number;
    end: number;
}
declare enum Mode {
    text = "text",
    tree = "tree"
}
declare enum SelectionType {
    after = "after",
    inside = "inside",
    key = "key",
    value = "value",
    multi = "multi"
}
declare enum CaretType {
    after = "after",
    key = "key",
    value = "value",
    inside = "inside"
}
interface CaretPosition {
    path: JSONPath;
    type: CaretType;
}
interface DocumentState {
    expandedMap: JSONPointerMap<boolean>;
    enforceStringMap: JSONPointerMap<boolean>;
    visibleSectionsMap: JSONPointerMap<VisibleSection[]>;
    selection: JSONSelection | undefined;
}
interface JSONPatchResult {
    json: JSONValue;
    previousJson: JSONValue;
    undo: JSONPatchDocument;
    redo: JSONPatchDocument;
}
declare type AfterPatchCallback = (patchedJson: JSONValue, patchedState: DocumentState) => {
    json?: JSONValue;
    state?: DocumentState;
};
interface MultiSelection {
    type: SelectionType.multi;
    paths: JSONPath[];
    anchorPath: JSONPath;
    focusPath: JSONPath;
    pointersMap: {
        [pointer: JSONPointer]: boolean;
    };
}
interface AfterSelection {
    type: SelectionType.after;
    anchorPath: JSONPath;
    focusPath: JSONPath;
    pointersMap: {
        [pointer: JSONPointer]: boolean;
    };
}
interface InsideSelection {
    type: SelectionType.inside;
    anchorPath: JSONPath;
    focusPath: JSONPath;
    pointersMap: {
        [pointer: JSONPointer]: boolean;
    };
}
interface KeySelection {
    type: SelectionType.key;
    anchorPath: JSONPath;
    focusPath: JSONPath;
    pointersMap: {
        [pointer: JSONPointer]: boolean;
    };
    edit?: boolean;
}
interface ValueSelection {
    type: SelectionType.value;
    anchorPath: JSONPath;
    focusPath: JSONPath;
    pointersMap: {
        [pointer: JSONPointer]: boolean;
    };
    edit?: boolean;
}
declare type JSONSelection = MultiSelection | AfterSelection | InsideSelection | KeySelection | ValueSelection;
declare type JSONPointerMap<T> = {
    [pointer: JSONPointer]: T;
};
declare type ClipboardValues = Array<{
    key: string;
    value: JSONValue;
}>;
interface FontAwesomeIcon {
    prefix: string;
    iconName: string;
    icon: [number, number, Array<number | string>, string, string];
}
interface DropdownButtonItem {
    text: string;
    onClick: () => void;
    icon?: FontAwesomeIcon;
    title?: string;
    disabled?: boolean;
}
interface MenuButtonItem {
    onClick: () => void;
    icon?: FontAwesomeIcon;
    text?: string;
    title?: string;
    className?: string;
    disabled?: boolean;
}
interface MenuSeparatorItem {
    separator: true;
}
interface MenuSpaceItem {
    space: true;
}
declare type MenuItem = MenuButtonItem | MenuSeparatorItem | MenuSpaceItem;
interface MessageAction {
    text: string;
    title: string;
    icon?: FontAwesomeIcon;
    onClick?: () => void;
    onMouseDown?: () => void;
    disabled?: boolean;
}
declare enum ValidationSeverity {
    info = "info",
    warning = "warning",
    error = "error"
}
interface ValidationError$1 {
    path: JSONPath;
    message: string;
    severity: ValidationSeverity;
}
interface NestedValidationError extends ValidationError$1 {
    isChildError?: boolean;
}
declare type Validator = (json: JSONValue) => ValidationError$1[];
interface ParseError {
    position: number | null;
    line: number | null;
    column: number | null;
    message: string;
}
interface ContentParseError {
    parseError: ParseError;
    isRepairable: boolean;
}
interface ContentValidationErrors {
    validationErrors: ValidationError$1[];
}
declare type ContentErrors = ContentParseError | ContentValidationErrors;
interface RichValidationError extends ValidationError$1 {
    line?: number;
    column?: number;
    from: number;
    to: number;
    actions: Array<{
        name: string;
        apply: () => void;
    }> | null;
}
interface TextLocation {
    path: JSONPath;
    line: number;
    column: number;
    from: number;
    to: number;
}
interface Section {
    start: number;
    end: number;
}
interface QueryLanguage {
    id: string;
    name: string;
    description: string;
    createQuery: (json: JSONValue, queryOptions: QueryLanguageOptions) => string;
    executeQuery: (json: JSONValue, query: string) => JSONValue;
}
interface QueryLanguageOptions {
    filter?: {
        path?: string[];
        relation?: '==' | '!=' | '<' | '<=' | '>' | '>=';
        value?: string;
    };
    sort?: {
        path?: string[];
        direction?: 'asc' | 'desc';
    };
    projection?: {
        paths?: string[][];
    };
}
declare type OnChangeQueryLanguage = (queryLanguageId: string) => void;
interface OnChangeStatus {
    contentErrors: ContentErrors;
    patchResult: JSONPatchResult | null;
}
declare type OnChange = ((content: Content, previousContent: Content, OnChangeStatus: any) => void) | null;
declare type OnSelect = (selection: JSONSelection) => void;
declare type OnPatch = (operations: JSONPatchDocument, afterPatch?: AfterPatchCallback) => void;
declare type OnSort = (operations: JSONPatchDocument) => void;
declare type OnFind = (findAndReplace: boolean) => void;
declare type OnPaste = (pastedText: string) => void;
declare type OnPasteJson = (pastedJson: {
    path: JSONPath;
    contents: JSONValue;
}) => void;
declare type OnRenderValue = (props: RenderValueProps) => RenderValueComponentDescription[];
declare type OnClassName = (path: JSONPath, value: JSONValue) => string | undefined;
declare type OnChangeMode = (mode: Mode) => void;
declare type OnContextMenu = (contextMenuProps: AbsolutePopupOptions) => void;
declare type OnRenderMenu = (mode: 'tree' | 'text' | 'repair', items: MenuItem[]) => MenuItem[] | undefined | void;
declare type OnError = (error: Error) => void;
declare type OnFocus = () => void;
declare type OnBlur = () => void;
interface SearchResult {
    items: ExtendedSearchResultItem[];
    itemsMap: JSONPointerMap<ExtendedSearchResultItem[]>;
    activeItem: ExtendedSearchResultItem | undefined;
    activeIndex: number | -1;
}
declare enum SearchField {
    key = "key",
    value = "value"
}
interface SearchResultItem {
    path: JSONPath;
    field: SearchField;
    fieldIndex: number;
    start: number;
    end: number;
}
interface ExtendedSearchResultItem extends SearchResultItem {
    active: boolean;
}
interface ValueNormalization {
    escapeValue: (unescapedValue: unknown) => string;
    unescapeValue: (escapedValue: string) => string;
}
declare type PastedJson = {
    contents: JSONValue;
    path: JSONPath;
} | undefined;
declare type EscapeValue = (value: JSONValue) => string;
declare type UnescapeValue = (escapedValue: string) => string;
interface DragInsideProps {
    json: JSONValue;
    selection: JSONSelection;
    deltaY: number;
    items: Array<{
        path: JSONPath;
        height: number;
    }>;
}
declare type DragInsideAction = {
    beforePath: JSONPath;
    offset: number;
} | {
    append: true;
    offset: number;
};
interface RenderedItem {
    path: JSONPath;
    height: number;
}
interface HistoryItem {
    undo: {
        patch: JSONPatchDocument | undefined;
        json: JSONValue | undefined;
        text: string | undefined;
        state: DocumentState;
        textIsRepaired: boolean;
    };
    redo: {
        patch: JSONPatchDocument | undefined;
        json: JSONValue | undefined;
        text: string | undefined;
        state: DocumentState;
        textIsRepaired: boolean;
    };
}
declare type InsertType = 'value' | 'object' | 'array' | 'structure';
interface PopupEntry {
    id: number;
    component: SvelteComponentTyped;
    props: Record<string, unknown>;
    options: AbsolutePopupOptions;
}
interface AbsolutePopupOptions {
    anchor?: Element;
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    offsetTop?: number;
    offsetLeft?: number;
    showTip?: boolean;
    closeOnOuterClick?: boolean;
    onClose?: () => void;
}
interface JSONEditorPropsOptional {
    content?: Content;
    readOnly?: boolean;
    indentation?: number | string;
    tabSize?: number;
    mode?: Mode;
    mainMenuBar?: boolean;
    navigationBar?: boolean;
    statusBar?: boolean;
    escapeControlCharacters?: boolean;
    escapeUnicodeCharacters?: boolean;
    validator?: Validator;
    queryLanguages?: QueryLanguage[];
    queryLanguageId?: string;
    onChangeQueryLanguage?: OnChangeQueryLanguage;
    onChange?: OnChange;
    onRenderValue?: OnRenderValue;
    onClassName?: OnClassName;
    onRenderMenu?: OnRenderMenu;
    onChangeMode?: OnChangeMode;
    onError?: OnError;
    onFocus?: OnFocus;
    onBlur?: OnBlur;
}
interface TreeModeContext {
    readOnly: boolean;
    parser: JSONParser;
    normalization: ValueNormalization;
    getJson: () => JSONValue;
    getDocumentState: () => DocumentState;
    findElement: (path: JSONPath) => Element | null;
    focus: () => void;
    onPatch: (operations: JSONPatchDocument, afterPatch?: AfterPatchCallback) => JSONPatchResult;
    onInsert: (type: InsertType) => void;
    onExpand: (path: JSONPath, expanded: boolean, recursive?: boolean) => void;
    onSelect: OnSelect;
    onFind: OnFind;
    onExpandSection: (path: JSONPath, section: Section) => void;
    onPasteJson: (newPastedJson: PastedJson) => void;
    onRenderValue: OnRenderValue;
    onContextMenu: OnContextMenu;
    onClassName: OnClassName;
    onDrag: (event: Event) => void;
    onDragEnd: () => void;
}
interface RenderValuePropsOptional {
    path?: JSONPath;
    value?: JSONValue;
    readOnly?: boolean;
    enforceString?: boolean;
    selection?: JSONSelection;
    searchResultItems?: SearchResultItem[];
    isSelected?: boolean;
    isEditing?: boolean;
    parser?: JSONParser;
    normalization?: ValueNormalization;
    onPatch?: TreeModeContext['onPatch'];
    onPasteJson?: OnPasteJson;
    onSelect?: OnSelect;
    onFind?: OnFind;
    focus?: () => void;
}
interface RenderValueProps extends RenderValuePropsOptional {
    path: JSONPath;
    value: JSONValue;
    readOnly: boolean;
    enforceString: boolean;
    selection: JSONSelection | undefined;
    searchResultItems: SearchResultItem[] | undefined;
    isSelected: boolean;
    isEditing: boolean;
    parser: JSONParser;
    normalization: ValueNormalization;
    onPatch: TreeModeContext['onPatch'];
    onPasteJson: OnPasteJson;
    onSelect: OnSelect;
    onFind: OnFind;
    focus: () => void;
}
interface JSONNodeProp {
    key: string;
    value: JSONValue;
    path: JSONPath;
    pointer: JSONPointer;
    expandedMap: JSONPointerMap<boolean> | undefined;
    enforceStringMap: JSONPointerMap<boolean> | undefined;
    visibleSectionsMap: JSONPointerMap<VisibleSection[]> | undefined;
    validationErrorsMap: JSONPointerMap<NestedValidationError> | undefined;
    keySearchResultItemsMap: ExtendedSearchResultItem[] | undefined;
    valueSearchResultItemsMap: JSONPointerMap<ExtendedSearchResultItem[]> | undefined;
    selection: JSONSelection | undefined;
}
interface JSONNodeItem {
    index: number;
    value: JSONValue;
    path: JSONPath;
    pointer: JSONPointer;
    expandedMap: JSONPointerMap<boolean> | undefined;
    enforceStringMap: JSONPointerMap<boolean> | undefined;
    visibleSectionsMap: JSONPointerMap<VisibleSection[]> | undefined;
    validationErrorsMap: JSONPointerMap<NestedValidationError> | undefined;
    searchResultItemsMap: JSONPointerMap<ExtendedSearchResultItem[]> | undefined;
    selection: JSONSelection | undefined;
}
interface DraggingState {
    initialTarget: Element;
    initialClientY: number;
    initialContentTop: number;
    selectionStartIndex: number;
    selectionItemsCount: number;
    items: RenderedItem[] | null;
    offset: number;
    didMoveItems: boolean;
}
interface RenderValueComponentDescription {
    component: SvelteComponentTyped;
    props: Record<string, unknown>;
}
interface TransformModalOptions {
    id?: string;
    selectedPath?: JSONPath;
    onTransform?: (state: {
        operations: JSONPatchDocument;
        json: JSONValue;
        transformedJson: JSONValue;
    }) => void;
    onClose?: () => void;
}
interface TransformModalCallback extends TransformModalOptions {
    id: string;
    selectedPath: JSONPath;
    json: JSONValue;
    onTransform: (state: {
        operations: JSONPatchDocument;
        json: JSONValue;
        transformedJson: JSONValue;
    }) => void;
    onClose: () => void;
}
interface SortModalCallback {
    id: string;
    json: JSONValue;
    selectedPath: JSONPath;
    onSort: OnSort;
    onClose: () => void;
}

declare const __propDef$8: {
    props: {
        content?: Content;
        readOnly?: boolean;
        indentation?: number | string;
        tabSize?: number;
        mode?: Mode;
        mainMenuBar?: boolean;
        navigationBar?: boolean;
        statusBar?: boolean;
        escapeControlCharacters?: boolean;
        escapeUnicodeCharacters?: boolean;
        parser?: JSONParser;
        validator?: Validator | null;
        validationParser?: JSONParser;
        pathParser?: JSONPathParser;
        queryLanguages?: QueryLanguage[];
        queryLanguageId?: string;
        onChangeQueryLanguage?: OnChangeQueryLanguage;
        onChange?: OnChange;
        onRenderValue?: OnRenderValue;
        onClassName?: OnClassName;
        onRenderMenu?: OnRenderMenu;
        onChangeMode?: OnChangeMode;
        onError?: OnError;
        onFocus?: OnFocus;
        onBlur?: OnBlur;
        get?: () => Content;
        set?: (newContent: Content) => void;
        update?: (updatedContent: Content) => void;
        patch?: (operations: JSONPatchDocument) => JSONPatchResult;
        expand?: (callback?: (path: JSONPath) => boolean) => void;
        transform?: (options: TransformModalOptions) => void;
        validate?: () => ContentErrors;
        acceptAutoRepair?: () => Content;
        scrollTo?: (path: JSONPath) => void;
        findElement?: (path: JSONPath) => Element;
        focus?: () => void;
        refresh?: () => void;
        updateProps?: (props: JSONEditorPropsOptional) => void;
        destroy?: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
declare type JsonEditorProps = typeof __propDef$8.props;
declare type JsonEditorEvents = typeof __propDef$8.events;
declare type JsonEditorSlots = typeof __propDef$8.slots;
declare class JsonEditor extends SvelteComponentTyped<JsonEditorProps, JsonEditorEvents, JsonEditorSlots> {
    get get(): () => Content;
    get set(): (newContent: Content) => void;
    get update(): (updatedContent: Content) => void;
    get patch(): (operations: JSONPatchDocument) => JSONPatchResult;
    get expand(): (callback?: (path: JSONPath) => boolean) => void;
    get transform(): (options: TransformModalOptions) => void;
    get validate(): () => ContentErrors;
    get acceptAutoRepair(): () => Content;
    get scrollTo(): (path: JSONPath) => void;
    get findElement(): (path: JSONPath) => Element;
    get focus(): () => void;
    get refresh(): () => void;
    get updateProps(): (props: JSONEditorPropsOptional) => void;
    get destroy(): () => void;
}

declare const __propDef$7: {
    props: {
        id: string;
        json: JSONValue;
        selectedPath: JSONPath;
        onSort: OnSort;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
declare type SortModalProps = typeof __propDef$7.props;
declare type SortModalEvents = typeof __propDef$7.events;
declare type SortModalSlots = typeof __propDef$7.slots;
declare class SortModal extends SvelteComponentTyped<SortModalProps, SortModalEvents, SortModalSlots> {
}

declare const __propDef$6: {
    props: {
        id?: string;
        json: JSONValue;
        selectedPath?: JSONPath;
        escapeControlCharacters: boolean;
        escapeUnicodeCharacters: boolean;
        parser: JSONParser;
        queryLanguages: QueryLanguage[];
        queryLanguageId: string;
        onChangeQueryLanguage: OnChangeQueryLanguage;
        onRenderValue: OnRenderValue;
        onClassName: OnClassName;
        onTransform: OnPatch;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
declare type TransformModalProps = typeof __propDef$6.props;
declare type TransformModalEvents = typeof __propDef$6.events;
declare type TransformModalSlots = typeof __propDef$6.slots;
declare class TransformModal extends SvelteComponentTyped<TransformModalProps, TransformModalEvents, TransformModalSlots> {
}

declare const __propDef$5: {
    props: {
        path: JSONPath;
        value: JSONValue;
        readOnly: boolean;
        onPatch: OnPatch;
        focus: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
declare type BooleanToggleProps = typeof __propDef$5.props;
declare type BooleanToggleEvents = typeof __propDef$5.events;
declare type BooleanToggleSlots = typeof __propDef$5.slots;
declare class BooleanToggle extends SvelteComponentTyped<BooleanToggleProps, BooleanToggleEvents, BooleanToggleSlots> {
}

declare const __propDef$4: {
    props: {
        path: JSONPath;
        value: string;
        readOnly: boolean;
        onPatch: OnPatch;
        focus: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
declare type ColorPickerProps = typeof __propDef$4.props;
declare type ColorPickerEvents = typeof __propDef$4.events;
declare type ColorPickerSlots = typeof __propDef$4.slots;
declare class ColorPicker extends SvelteComponentTyped<ColorPickerProps, ColorPickerEvents, ColorPickerSlots> {
}

declare const __propDef$3: {
    props: {
        path: JSONPath;
        value: JSONValue;
        parser: JSONParser;
        normalization: ValueNormalization;
        enforceString: boolean;
        onPatch: OnPatch;
        onPasteJson: OnPasteJson;
        onSelect: OnSelect;
        onFind: OnFind;
        focus: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
declare type EditableValueProps = typeof __propDef$3.props;
declare type EditableValueEvents = typeof __propDef$3.events;
declare type EditableValueSlots = typeof __propDef$3.slots;
declare class EditableValue extends SvelteComponentTyped<EditableValueProps, EditableValueEvents, EditableValueSlots> {
}

declare const __propDef$2: {
    props: {
        path: JSONPath;
        value: JSONValue;
        parser: JSONParser;
        readOnly: boolean;
        isSelected: boolean;
        onPatch: OnPatch;
        options: {
            value: unknown;
            text: string;
        }[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
declare type EnumValueProps = typeof __propDef$2.props;
declare type EnumValueEvents = typeof __propDef$2.events;
declare type EnumValueSlots = typeof __propDef$2.slots;
declare class EnumValue extends SvelteComponentTyped<EnumValueProps, EnumValueEvents, EnumValueSlots> {
}

declare const __propDef$1: {
    props: {
        path: JSONPath;
        value: JSONValue;
        readOnly: boolean;
        normalization: ValueNormalization;
        parser: JSONParser;
        onSelect: OnSelect;
        searchResultItems: ExtendedSearchResultItem[] | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
declare type ReadonlyValueProps = typeof __propDef$1.props;
declare type ReadonlyValueEvents = typeof __propDef$1.events;
declare type ReadonlyValueSlots = typeof __propDef$1.slots;
declare class ReadonlyValue extends SvelteComponentTyped<ReadonlyValueProps, ReadonlyValueEvents, ReadonlyValueSlots> {
}

declare const __propDef: {
    props: {
        value: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
declare type TimestampTagProps = typeof __propDef.props;
declare type TimestampTagEvents = typeof __propDef.events;
declare type TimestampTagSlots = typeof __propDef.slots;
declare class TimestampTag extends SvelteComponentTyped<TimestampTagProps, TimestampTagEvents, TimestampTagSlots> {
}

declare function renderValue({ path, value, readOnly, enforceString, searchResultItems, isEditing, parser, normalization, onPatch, onPasteJson, onSelect, onFind, focus }: RenderValueProps): RenderValueComponentDescription[];

/**
 * Search the JSON schema for enums defined at given props.path. If found,
 * return an EnumValue renderer. If not found, return null. In that case you
 * have to fallback on the default valueRender function
 */
declare function renderJSONSchemaEnum(props: RenderValueProps, schema: JSONValue, schemaDefinitions: JSONValue): RenderValueComponentDescription[];

interface URIComponents {
    scheme?: string;
    userinfo?: string;
    host?: string;
    port?: number | string;
    path?: string;
    query?: string;
    fragment?: string;
    reference?: string;
    error?: string;
}

declare abstract class _CodeOrName {
    abstract readonly str: string;
    abstract readonly names: UsedNames;
    abstract toString(): string;
    abstract emptyStr(): boolean;
}
declare class Name extends _CodeOrName {
    readonly str: string;
    constructor(s: string);
    toString(): string;
    emptyStr(): boolean;
    get names(): UsedNames;
}
declare class _Code extends _CodeOrName {
    readonly _items: readonly CodeItem[];
    private _str?;
    private _names?;
    constructor(code: string | readonly CodeItem[]);
    toString(): string;
    emptyStr(): boolean;
    get str(): string;
    get names(): UsedNames;
}
declare type CodeItem = Name | string | number | boolean | null;
declare type UsedNames = Record<string, number | undefined>;
declare type Code = _Code | Name;

interface NameGroup {
    prefix: string;
    index: number;
}
interface NameValue {
    ref: ValueReference;
    key?: unknown;
    code?: Code;
}
declare type ValueReference = unknown;
interface ScopeOptions {
    prefixes?: Set<string>;
    parent?: Scope;
}
interface ValueScopeOptions extends ScopeOptions {
    scope: ScopeStore;
    es5?: boolean;
    lines?: boolean;
}
declare type ScopeStore = Record<string, ValueReference[] | undefined>;
declare type ScopeValues = {
    [Prefix in string]?: Map<unknown, ValueScopeName>;
};
declare type ScopeValueSets = {
    [Prefix in string]?: Set<ValueScopeName>;
};
declare enum UsedValueState {
    Started = 0,
    Completed = 1
}
declare type UsedScopeValues = {
    [Prefix in string]?: Map<ValueScopeName, UsedValueState | undefined>;
};
declare class Scope {
    protected readonly _names: {
        [Prefix in string]?: NameGroup;
    };
    protected readonly _prefixes?: Set<string>;
    protected readonly _parent?: Scope;
    constructor({ prefixes, parent }?: ScopeOptions);
    toName(nameOrPrefix: Name | string): Name;
    name(prefix: string): Name;
    protected _newName(prefix: string): string;
    private _nameGroup;
}
interface ScopePath {
    property: string;
    itemIndex: number;
}
declare class ValueScopeName extends Name {
    readonly prefix: string;
    value?: NameValue;
    scopePath?: Code;
    constructor(prefix: string, nameStr: string);
    setValue(value: NameValue, { property, itemIndex }: ScopePath): void;
}
interface VSOptions extends ValueScopeOptions {
    _n: Code;
}
declare class ValueScope extends Scope {
    protected readonly _values: ScopeValues;
    protected readonly _scope: ScopeStore;
    readonly opts: VSOptions;
    constructor(opts: ValueScopeOptions);
    get(): ScopeStore;
    name(prefix: string): ValueScopeName;
    value(nameOrPrefix: ValueScopeName | string, value: NameValue): ValueScopeName;
    getValue(prefix: string, keyOrRef: unknown): ValueScopeName | undefined;
    scopeRefs(scopeName: Name, values?: ScopeValues | ScopeValueSets): Code;
    scopeCode(values?: ScopeValues | ScopeValueSets, usedValues?: UsedScopeValues, getCode?: (n: ValueScopeName) => Code | undefined): Code;
    private _reduceValues;
}

declare type SafeExpr = Code | number | boolean | null;
declare type Block = Code | (() => void);
interface CodeGenOptions {
    es5?: boolean;
    lines?: boolean;
    ownProperties?: boolean;
}
declare class CodeGen {
    readonly _scope: Scope;
    readonly _extScope: ValueScope;
    readonly _values: ScopeValueSets;
    private readonly _nodes;
    private readonly _blockStarts;
    private readonly _constants;
    private readonly opts;
    constructor(extScope: ValueScope, opts?: CodeGenOptions);
    toString(): string;
    name(prefix: string): Name;
    scopeName(prefix: string): ValueScopeName;
    scopeValue(prefixOrName: ValueScopeName | string, value: NameValue): Name;
    getScopeValue(prefix: string, keyOrRef: unknown): ValueScopeName | undefined;
    scopeRefs(scopeName: Name): Code;
    scopeCode(): Code;
    private _def;
    const(nameOrPrefix: Name | string, rhs: SafeExpr, _constant?: boolean): Name;
    let(nameOrPrefix: Name | string, rhs?: SafeExpr, _constant?: boolean): Name;
    var(nameOrPrefix: Name | string, rhs?: SafeExpr, _constant?: boolean): Name;
    assign(lhs: Code, rhs: SafeExpr, sideEffects?: boolean): CodeGen;
    add(lhs: Code, rhs: SafeExpr): CodeGen;
    code(c: Block | SafeExpr): CodeGen;
    object(...keyValues: [Name | string, SafeExpr | string][]): _Code;
    if(condition: Code | boolean, thenBody?: Block, elseBody?: Block): CodeGen;
    elseIf(condition: Code | boolean): CodeGen;
    else(): CodeGen;
    endIf(): CodeGen;
    private _for;
    for(iteration: Code, forBody?: Block): CodeGen;
    forRange(nameOrPrefix: Name | string, from: SafeExpr, to: SafeExpr, forBody: (index: Name) => void, varKind?: Code): CodeGen;
    forOf(nameOrPrefix: Name | string, iterable: Code, forBody: (item: Name) => void, varKind?: Code): CodeGen;
    forIn(nameOrPrefix: Name | string, obj: Code, forBody: (item: Name) => void, varKind?: Code): CodeGen;
    endFor(): CodeGen;
    label(label: Name): CodeGen;
    break(label?: Code): CodeGen;
    return(value: Block | SafeExpr): CodeGen;
    try(tryBody: Block, catchCode?: (e: Name) => void, finallyCode?: Block): CodeGen;
    throw(error: Code): CodeGen;
    block(body?: Block, nodeCount?: number): CodeGen;
    endBlock(nodeCount?: number): CodeGen;
    func(name: Name, args?: Code, async?: boolean, funcBody?: Block): CodeGen;
    endFunc(): CodeGen;
    optimize(n?: number): void;
    private _leafNode;
    private _blockNode;
    private _endBlockNode;
    private _elseNode;
    private get _root();
    private get _currNode();
    private set _currNode(value);
}

declare const _jsonTypes: readonly ["string", "number", "integer", "boolean", "null", "object", "array"];
declare type JSONType$1 = typeof _jsonTypes[number];
declare type ValidationTypes = {
    [K in JSONType$1]: boolean | RuleGroup | undefined;
};
interface ValidationRules {
    rules: RuleGroup[];
    post: RuleGroup;
    all: {
        [Key in string]?: boolean | Rule;
    };
    keywords: {
        [Key in string]?: boolean;
    };
    types: ValidationTypes;
}
interface RuleGroup {
    type?: JSONType$1;
    rules: Rule[];
}
interface Rule {
    keyword: string;
    definition: AddedKeywordDefinition;
}

declare enum Type {
    Num = 0,
    Str = 1
}

declare type SubschemaArgs = Partial<{
    keyword: string;
    schemaProp: string | number;
    schema: AnySchema;
    schemaPath: Code;
    errSchemaPath: string;
    topSchemaRef: Code;
    data: Name | Code;
    dataProp: Code | string | number;
    dataTypes: JSONType$1[];
    definedProperties: Set<string>;
    propertyName: Name;
    dataPropType: Type;
    jtdDiscriminator: string;
    jtdMetadata: boolean;
    compositeRule: true;
    createErrors: boolean;
    allErrors: boolean;
}>;

interface ErrorPaths {
    instancePath?: Code;
    schemaPath?: string;
    parentSchema?: boolean;
}

declare class KeywordCxt implements KeywordErrorCxt {
    readonly gen: CodeGen;
    readonly allErrors?: boolean;
    readonly keyword: string;
    readonly data: Name;
    readonly $data?: string | false;
    schema: any;
    readonly schemaValue: Code | number | boolean;
    readonly schemaCode: Code | number | boolean;
    readonly schemaType: JSONType$1[];
    readonly parentSchema: AnySchemaObject;
    readonly errsCount?: Name;
    params: KeywordCxtParams;
    readonly it: SchemaObjCxt;
    readonly def: AddedKeywordDefinition;
    constructor(it: SchemaObjCxt, def: AddedKeywordDefinition, keyword: string);
    result(condition: Code, successAction?: () => void, failAction?: () => void): void;
    failResult(condition: Code, successAction?: () => void, failAction?: () => void): void;
    pass(condition: Code, failAction?: () => void): void;
    fail(condition?: Code): void;
    fail$data(condition: Code): void;
    error(append?: boolean, errorParams?: KeywordCxtParams, errorPaths?: ErrorPaths): void;
    private _error;
    $dataError(): void;
    reset(): void;
    ok(cond: Code | boolean): void;
    setParams(obj: KeywordCxtParams, assign?: true): void;
    block$data(valid: Name, codeBlock: () => void, $dataValid?: Code): void;
    check$data(valid?: Name, $dataValid?: Code): void;
    invalid$data(): Code;
    subschema(appl: SubschemaArgs, valid: Name): SchemaCxt;
    mergeEvaluated(schemaCxt: SchemaCxt, toName?: typeof Name): void;
    mergeValidEvaluated(schemaCxt: SchemaCxt, valid: Name): boolean | void;
}

declare type StrictNullChecksWrapper<Name extends string, Type> = undefined extends null ? `strictNullChecks must be true in tsconfig to use ${Name}` : Type;
declare type UnionToIntersection<U> = (U extends any ? (_: U) => void : never) extends (_: infer I) => void ? I : never;
declare type UncheckedPartialSchema<T> = Partial<UncheckedJSONSchemaType<T, true>>;
declare type JSONType<T extends string, IsPartial extends boolean> = IsPartial extends true ? T | undefined : T;
interface NumberKeywords {
    minimum?: number;
    maximum?: number;
    exclusiveMinimum?: number;
    exclusiveMaximum?: number;
    multipleOf?: number;
    format?: string;
}
interface StringKeywords {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    format?: string;
}
declare type UncheckedJSONSchemaType<T, IsPartial extends boolean> = (// these two unions allow arbitrary unions of types
{
    anyOf: readonly UncheckedJSONSchemaType<T, IsPartial>[];
} | {
    oneOf: readonly UncheckedJSONSchemaType<T, IsPartial>[];
} | ({
    type: readonly (T extends number ? JSONType<"number" | "integer", IsPartial> : T extends string ? JSONType<"string", IsPartial> : T extends boolean ? JSONType<"boolean", IsPartial> : never)[];
} & UnionToIntersection<T extends number ? NumberKeywords : T extends string ? StringKeywords : T extends boolean ? {} : never>) | ((T extends number ? {
    type: JSONType<"number" | "integer", IsPartial>;
} & NumberKeywords : T extends string ? {
    type: JSONType<"string", IsPartial>;
} & StringKeywords : T extends boolean ? {
    type: JSONType<"boolean", IsPartial>;
} : T extends readonly [any, ...any[]] ? {
    type: JSONType<"array", IsPartial>;
    items: {
        readonly [K in keyof T]-?: UncheckedJSONSchemaType<T[K], false> & Nullable<T[K]>;
    } & {
        length: T["length"];
    };
    minItems: T["length"];
} & ({
    maxItems: T["length"];
} | {
    additionalItems: false;
}) : T extends readonly any[] ? {
    type: JSONType<"array", IsPartial>;
    items: UncheckedJSONSchemaType<T[0], false>;
    contains?: UncheckedPartialSchema<T[0]>;
    minItems?: number;
    maxItems?: number;
    minContains?: number;
    maxContains?: number;
    uniqueItems?: true;
    additionalItems?: never;
} : T extends Record<string, any> ? {
    type: JSONType<"object", IsPartial>;
    additionalProperties?: boolean | UncheckedJSONSchemaType<T[string], false>;
    unevaluatedProperties?: boolean | UncheckedJSONSchemaType<T[string], false>;
    properties?: IsPartial extends true ? Partial<UncheckedPropertiesSchema<T>> : UncheckedPropertiesSchema<T>;
    patternProperties?: Record<string, UncheckedJSONSchemaType<T[string], false>>;
    propertyNames?: Omit<UncheckedJSONSchemaType<string, false>, "type"> & {
        type?: "string";
    };
    dependencies?: {
        [K in keyof T]?: Readonly<(keyof T)[]> | UncheckedPartialSchema<T>;
    };
    dependentRequired?: {
        [K in keyof T]?: Readonly<(keyof T)[]>;
    };
    dependentSchemas?: {
        [K in keyof T]?: UncheckedPartialSchema<T>;
    };
    minProperties?: number;
    maxProperties?: number;
} & (IsPartial extends true ? {
    required: Readonly<(keyof T)[]>;
} : [UncheckedRequiredMembers<T>] extends [never] ? {
    required?: Readonly<UncheckedRequiredMembers<T>[]>;
} : {
    required: Readonly<UncheckedRequiredMembers<T>[]>;
}) : T extends null ? {
    type: JSONType<"null", IsPartial>;
    nullable: true;
} : never) & {
    allOf?: Readonly<UncheckedPartialSchema<T>[]>;
    anyOf?: Readonly<UncheckedPartialSchema<T>[]>;
    oneOf?: Readonly<UncheckedPartialSchema<T>[]>;
    if?: UncheckedPartialSchema<T>;
    then?: UncheckedPartialSchema<T>;
    else?: UncheckedPartialSchema<T>;
    not?: UncheckedPartialSchema<T>;
})) & {
    [keyword: string]: any;
    $id?: string;
    $ref?: string;
    $defs?: Record<string, UncheckedJSONSchemaType<Known, true>>;
    definitions?: Record<string, UncheckedJSONSchemaType<Known, true>>;
};
declare type JSONSchemaType<T> = StrictNullChecksWrapper<"JSONSchemaType", UncheckedJSONSchemaType<T, false>>;
declare type Known = {
    [key: string]: Known;
} | [Known, ...Known[]] | Known[] | number | string | boolean | null;
declare type UncheckedPropertiesSchema<T> = {
    [K in keyof T]-?: (UncheckedJSONSchemaType<T[K], false> & Nullable<T[K]>) | {
        $ref: string;
    };
};
declare type UncheckedRequiredMembers<T> = {
    [K in keyof T]-?: undefined extends T[K] ? never : K;
}[keyof T];
declare type Nullable<T> = undefined extends T ? {
    nullable: true;
    const?: null;
    enum?: Readonly<(T | null)[]>;
    default?: T | null;
} : {
    const?: T;
    enum?: Readonly<T[]>;
    default?: T;
};

/** numeric strings */
declare type NumberType = "float32" | "float64" | "int8" | "uint8" | "int16" | "uint16" | "int32" | "uint32";
/** string strings */
declare type StringType = "string" | "timestamp";
/** Generic JTD Schema without inference of the represented type */
declare type SomeJTDSchemaType = (// ref
{
    ref: string;
} | {
    type: NumberType | StringType | "boolean";
} | {
    enum: string[];
} | {
    elements: SomeJTDSchemaType;
} | {
    values: SomeJTDSchemaType;
} | {
    properties: Record<string, SomeJTDSchemaType>;
    optionalProperties?: Record<string, SomeJTDSchemaType>;
    additionalProperties?: boolean;
} | {
    properties?: Record<string, SomeJTDSchemaType>;
    optionalProperties: Record<string, SomeJTDSchemaType>;
    additionalProperties?: boolean;
} | {
    discriminator: string;
    mapping: Record<string, SomeJTDSchemaType>;
} | {}) & {
    nullable?: boolean;
    metadata?: Record<string, unknown>;
    definitions?: Record<string, SomeJTDSchemaType>;
};
/** required keys of an object, not undefined */
declare type RequiredKeys<T> = {
    [K in keyof T]-?: undefined extends T[K] ? never : K;
}[keyof T];
/** optional or undifined-able keys of an object */
declare type OptionalKeys<T> = {
    [K in keyof T]-?: undefined extends T[K] ? K : never;
}[keyof T];
/** type is true if T is a union type */
declare type IsUnion_<T, U extends T = T> = false extends (T extends unknown ? ([U] extends [T] ? false : true) : never) ? false : true;
declare type IsUnion<T> = IsUnion_<T>;
/** type is true if T is identically E */
declare type TypeEquality<T, E> = [T] extends [E] ? ([E] extends [T] ? true : false) : false;
/** type is true if T or null is identically E or null*/
declare type NullTypeEquality<T, E> = TypeEquality<T | null, E | null>;
/** gets only the string literals of a type or null if a type isn't a string literal */
declare type EnumString<T> = [T] extends [never] ? null : T extends string ? string extends T ? null : T : null;
/** true if type is a union of string literals */
declare type IsEnum<T> = null extends EnumString<Exclude<T, null>> ? false : true;
/** true only if all types are array types (not tuples) */
declare type IsElements<T> = false extends IsUnion<T> ? [T] extends [readonly unknown[]] ? undefined extends T[0.5] ? false : true : false : false;
/** true if the the type is a values type */
declare type IsValues<T> = false extends IsUnion<Exclude<T, null>> ? TypeEquality<keyof Exclude<T, null>, string> : false;
/** true if type is a proeprties type and Union is false, or type is a discriminator type and Union is true */
declare type IsRecord<T, Union extends boolean> = Union extends IsUnion<Exclude<T, null>> ? null extends EnumString<keyof Exclude<T, null>> ? false : true : false;
/** actual schema */
declare type JTDSchemaType<T, D extends Record<string, unknown> = Record<string, never>> = (// refs - where null wasn't specified, must match exactly
(null extends EnumString<keyof D> ? never : ({
    [K in keyof D]: [T] extends [D[K]] ? {
        ref: K;
    } : never;
}[keyof D] & {
    nullable?: false;
}) | (null extends T ? {
    [K in keyof D]: [Exclude<T, null>] extends [Exclude<D[K], null>] ? {
        ref: K;
    } : never;
}[keyof D] & {
    nullable: true;
} : never)) | (unknown extends T ? {
    nullable?: boolean;
} : never) | ((true extends NullTypeEquality<T, number> ? {
    type: NumberType;
} : true extends NullTypeEquality<T, boolean> ? {
    type: "boolean";
} : true extends NullTypeEquality<T, string> ? {
    type: StringType;
} : true extends NullTypeEquality<T, Date> ? {
    type: "timestamp";
} : true extends IsEnum<T> ? {
    enum: EnumString<Exclude<T, null>>[];
} : true extends IsElements<Exclude<T, null>> ? T extends readonly (infer E)[] ? {
    elements: JTDSchemaType<E, D>;
} : never : true extends IsValues<T> ? T extends Record<string, infer V> ? {
    values: JTDSchemaType<V, D>;
} : never : true extends IsRecord<T, false> ? ([RequiredKeys<Exclude<T, null>>] extends [never] ? {
    properties?: Record<string, never>;
} : {
    properties: {
        [K in RequiredKeys<T>]: JTDSchemaType<T[K], D>;
    };
}) & ([OptionalKeys<Exclude<T, null>>] extends [never] ? {
    optionalProperties?: Record<string, never>;
} : {
    optionalProperties: {
        [K in OptionalKeys<T>]: JTDSchemaType<Exclude<T[K], undefined>, D>;
    };
}) & {
    additionalProperties?: boolean;
} : true extends IsRecord<T, true> ? {
    [K in keyof Exclude<T, null>]-?: Exclude<T, null>[K] extends string ? {
        discriminator: K;
        mapping: {
            [M in Exclude<T, null>[K]]: JTDSchemaType<Omit<T extends {
                [C in K]: M;
            } ? T : never, K>, D>;
        };
    } : never;
}[keyof Exclude<T, null>] : never) & (null extends T ? {
    nullable: true;
} : {
    nullable?: false;
}))) & {
    metadata?: Record<string, unknown>;
    definitions?: {
        [K in keyof D]: JTDSchemaType<D[K], D>;
    };
};
declare type JTDDataDef<S, D extends Record<string, unknown>> = // ref
(S extends {
    ref: string;
} ? D extends {
    [K in S["ref"]]: infer V;
} ? JTDDataDef<V, D> : never : S extends {
    type: NumberType;
} ? number : S extends {
    type: "boolean";
} ? boolean : S extends {
    type: "string";
} ? string : S extends {
    type: "timestamp";
} ? string | Date : S extends {
    enum: readonly (infer E)[];
} ? string extends E ? never : [E] extends [string] ? E : never : S extends {
    elements: infer E;
} ? JTDDataDef<E, D>[] : S extends {
    properties: Record<string, unknown>;
    optionalProperties?: Record<string, unknown>;
    additionalProperties?: boolean;
} ? {
    -readonly [K in keyof S["properties"]]-?: JTDDataDef<S["properties"][K], D>;
} & {
    -readonly [K in keyof S["optionalProperties"]]+?: JTDDataDef<S["optionalProperties"][K], D>;
} & ([S["additionalProperties"]] extends [true] ? Record<string, unknown> : unknown) : S extends {
    properties?: Record<string, unknown>;
    optionalProperties: Record<string, unknown>;
    additionalProperties?: boolean;
} ? {
    -readonly [K in keyof S["properties"]]-?: JTDDataDef<S["properties"][K], D>;
} & {
    -readonly [K in keyof S["optionalProperties"]]+?: JTDDataDef<S["optionalProperties"][K], D>;
} & ([S["additionalProperties"]] extends [true] ? Record<string, unknown> : unknown) : S extends {
    values: infer V;
} ? Record<string, JTDDataDef<V, D>> : S extends {
    discriminator: infer M;
    mapping: Record<string, unknown>;
} ? [M] extends [string] ? {
    [K in keyof S["mapping"]]: JTDDataDef<S["mapping"][K], D> & {
        [KM in M]: K;
    };
}[keyof S["mapping"]] : never : unknown) | (S extends {
    nullable: true;
} ? null : never);
declare type JTDDataType<S> = S extends {
    definitions: Record<string, unknown>;
} ? JTDDataDef<S, S["definitions"]> : JTDDataDef<S, Record<string, never>>;

declare class ValidationError extends Error {
    readonly errors: Partial<ErrorObject>[];
    readonly ajv: true;
    readonly validation: true;
    constructor(errors: Partial<ErrorObject>[]);
}

declare class MissingRefError extends Error {
    readonly missingRef: string;
    readonly missingSchema: string;
    constructor(resolver: UriResolver, baseId: string, ref: string, msg?: string);
}

declare type Options = CurrentOptions & DeprecatedOptions;
interface CurrentOptions {
    strict?: boolean | "log";
    strictSchema?: boolean | "log";
    strictNumbers?: boolean | "log";
    strictTypes?: boolean | "log";
    strictTuples?: boolean | "log";
    strictRequired?: boolean | "log";
    allowMatchingProperties?: boolean;
    allowUnionTypes?: boolean;
    validateFormats?: boolean;
    $data?: boolean;
    allErrors?: boolean;
    verbose?: boolean;
    discriminator?: boolean;
    unicodeRegExp?: boolean;
    timestamp?: "string" | "date";
    parseDate?: boolean;
    allowDate?: boolean;
    $comment?: true | ((comment: string, schemaPath?: string, rootSchema?: AnySchemaObject) => unknown);
    formats?: {
        [Name in string]?: Format;
    };
    keywords?: Vocabulary;
    schemas?: AnySchema[] | {
        [Key in string]?: AnySchema;
    };
    logger?: Logger | false;
    loadSchema?: (uri: string) => Promise<AnySchemaObject>;
    removeAdditional?: boolean | "all" | "failing";
    useDefaults?: boolean | "empty";
    coerceTypes?: boolean | "array";
    next?: boolean;
    unevaluated?: boolean;
    dynamicRef?: boolean;
    schemaId?: "id" | "$id";
    jtd?: boolean;
    meta?: SchemaObject | boolean;
    defaultMeta?: string | AnySchemaObject;
    validateSchema?: boolean | "log";
    addUsedSchema?: boolean;
    inlineRefs?: boolean | number;
    passContext?: boolean;
    loopRequired?: number;
    loopEnum?: number;
    ownProperties?: boolean;
    multipleOfPrecision?: number;
    int32range?: boolean;
    messages?: boolean;
    code?: CodeOptions;
    uriResolver?: UriResolver;
}
interface CodeOptions {
    es5?: boolean;
    esm?: boolean;
    lines?: boolean;
    optimize?: boolean | number;
    formats?: Code;
    source?: boolean;
    process?: (code: string, schema?: SchemaEnv) => string;
    regExp?: RegExpEngine;
}
interface InstanceCodeOptions extends CodeOptions {
    regExp: RegExpEngine;
    optimize: number;
}
interface DeprecatedOptions {
    /** @deprecated */
    ignoreKeywordsWithRef?: boolean;
    /** @deprecated */
    jsPropertySyntax?: boolean;
    /** @deprecated */
    unicode?: boolean;
}
declare type RequiredInstanceOptions = {
    [K in "strictSchema" | "strictNumbers" | "strictTypes" | "strictTuples" | "strictRequired" | "inlineRefs" | "loopRequired" | "loopEnum" | "meta" | "messages" | "schemaId" | "addUsedSchema" | "validateSchema" | "validateFormats" | "int32range" | "unicodeRegExp" | "uriResolver"]: NonNullable<Options[K]>;
} & {
    code: InstanceCodeOptions;
};
declare type InstanceOptions = Options & RequiredInstanceOptions;
interface Logger {
    log(...args: unknown[]): unknown;
    warn(...args: unknown[]): unknown;
    error(...args: unknown[]): unknown;
}
declare class Ajv {
    opts: InstanceOptions;
    errors?: ErrorObject[] | null;
    logger: Logger;
    readonly scope: ValueScope;
    readonly schemas: {
        [Key in string]?: SchemaEnv;
    };
    readonly refs: {
        [Ref in string]?: SchemaEnv | string;
    };
    readonly formats: {
        [Name in string]?: AddedFormat;
    };
    readonly RULES: ValidationRules;
    readonly _compilations: Set<SchemaEnv>;
    private readonly _loading;
    private readonly _cache;
    private readonly _metaOpts;
    static ValidationError: typeof ValidationError;
    static MissingRefError: typeof MissingRefError;
    constructor(opts?: Options);
    _addVocabularies(): void;
    _addDefaultMetaSchema(): void;
    defaultMeta(): string | AnySchemaObject | undefined;
    validate(schema: Schema | string, data: unknown): boolean;
    validate(schemaKeyRef: AnySchema | string, data: unknown): boolean | Promise<unknown>;
    validate<T>(schema: Schema | JSONSchemaType<T> | string, data: unknown): data is T;
    validate<T>(schema: JTDSchemaType<T>, data: unknown): data is T;
    validate<N extends never, T extends SomeJTDSchemaType>(schema: T, data: unknown): data is JTDDataType<T>;
    validate<T>(schema: AsyncSchema, data: unknown | T): Promise<T>;
    validate<T>(schemaKeyRef: AnySchema | string, data: unknown): data is T | Promise<T>;
    compile<T = unknown>(schema: Schema | JSONSchemaType<T>, _meta?: boolean): ValidateFunction<T>;
    compile<T = unknown>(schema: JTDSchemaType<T>, _meta?: boolean): ValidateFunction<T>;
    compile<N extends never, T extends SomeJTDSchemaType>(schema: T, _meta?: boolean): ValidateFunction<JTDDataType<T>>;
    compile<T = unknown>(schema: AsyncSchema, _meta?: boolean): AsyncValidateFunction<T>;
    compile<T = unknown>(schema: AnySchema, _meta?: boolean): AnyValidateFunction<T>;
    compileAsync<T = unknown>(schema: SchemaObject | JSONSchemaType<T>, _meta?: boolean): Promise<ValidateFunction<T>>;
    compileAsync<T = unknown>(schema: JTDSchemaType<T>, _meta?: boolean): Promise<ValidateFunction<T>>;
    compileAsync<T = unknown>(schema: AsyncSchema, meta?: boolean): Promise<AsyncValidateFunction<T>>;
    compileAsync<T = unknown>(schema: AnySchemaObject, meta?: boolean): Promise<AnyValidateFunction<T>>;
    addSchema(schema: AnySchema | AnySchema[], // If array is passed, `key` will be ignored
    key?: string, // Optional schema key. Can be passed to `validate` method instead of schema object or id/ref. One schema per instance can have empty `id` and `key`.
    _meta?: boolean, // true if schema is a meta-schema. Used internally, addMetaSchema should be used instead.
    _validateSchema?: boolean | "log"): Ajv;
    addMetaSchema(schema: AnySchemaObject, key?: string, // schema key
    _validateSchema?: boolean | "log"): Ajv;
    validateSchema(schema: AnySchema, throwOrLogError?: boolean): boolean | Promise<unknown>;
    getSchema<T = unknown>(keyRef: string): AnyValidateFunction<T> | undefined;
    removeSchema(schemaKeyRef?: AnySchema | string | RegExp): Ajv;
    addVocabulary(definitions: Vocabulary): Ajv;
    addKeyword(kwdOrDef: string | KeywordDefinition, def?: KeywordDefinition): Ajv;
    getKeyword(keyword: string): AddedKeywordDefinition | boolean;
    removeKeyword(keyword: string): Ajv;
    addFormat(name: string, format: Format): Ajv;
    errorsText(errors?: ErrorObject[] | null | undefined, // optional array of validation errors
    { separator, dataVar }?: ErrorsTextOptions): string;
    $dataMetaSchema(metaSchema: AnySchemaObject, keywordsJsonPointers: string[]): AnySchemaObject;
    private _removeAllSchemas;
    _addSchema(schema: AnySchema, meta?: boolean, baseId?: string, validateSchema?: boolean | "log", addSchema?: boolean): SchemaEnv;
    private _checkUnique;
    private _compileSchemaEnv;
    private _compileMetaSchema;
}
interface ErrorsTextOptions {
    separator?: string;
    dataVar?: string;
}

declare type LocalRefs = {
    [Ref in string]?: AnySchemaObject;
};

declare type SchemaRefs = {
    [Ref in string]?: SchemaEnv | AnySchema;
};
interface SchemaCxt {
    readonly gen: CodeGen;
    readonly allErrors?: boolean;
    readonly data: Name;
    readonly parentData: Name;
    readonly parentDataProperty: Code | number;
    readonly dataNames: Name[];
    readonly dataPathArr: (Code | number)[];
    readonly dataLevel: number;
    dataTypes: JSONType$1[];
    definedProperties: Set<string>;
    readonly topSchemaRef: Code;
    readonly validateName: Name;
    evaluated?: Name;
    readonly ValidationError?: Name;
    readonly schema: AnySchema;
    readonly schemaEnv: SchemaEnv;
    readonly rootId: string;
    baseId: string;
    readonly schemaPath: Code;
    readonly errSchemaPath: string;
    readonly errorPath: Code;
    readonly propertyName?: Name;
    readonly compositeRule?: boolean;
    props?: EvaluatedProperties | Name;
    items?: EvaluatedItems | Name;
    jtdDiscriminator?: string;
    jtdMetadata?: boolean;
    readonly createErrors?: boolean;
    readonly opts: InstanceOptions;
    readonly self: Ajv;
}
interface SchemaObjCxt extends SchemaCxt {
    readonly schema: AnySchemaObject;
}
interface SchemaEnvArgs {
    readonly schema: AnySchema;
    readonly schemaId?: "$id" | "id";
    readonly root?: SchemaEnv;
    readonly baseId?: string;
    readonly schemaPath?: string;
    readonly localRefs?: LocalRefs;
    readonly meta?: boolean;
}
declare class SchemaEnv implements SchemaEnvArgs {
    readonly schema: AnySchema;
    readonly schemaId?: "$id" | "id";
    readonly root: SchemaEnv;
    baseId: string;
    schemaPath?: string;
    localRefs?: LocalRefs;
    readonly meta?: boolean;
    readonly $async?: boolean;
    readonly refs: SchemaRefs;
    readonly dynamicAnchors: {
        [Ref in string]?: true;
    };
    validate?: AnyValidateFunction;
    validateName?: ValueScopeName;
    serialize?: (data: unknown) => string;
    serializeName?: ValueScopeName;
    parse?: (data: string) => unknown;
    parseName?: ValueScopeName;
    constructor(env: SchemaEnvArgs);
}

interface _SchemaObject {
    id?: string;
    $id?: string;
    $schema?: string;
    [x: string]: any;
}
interface SchemaObject extends _SchemaObject {
    id?: string;
    $id?: string;
    $schema?: string;
    $async?: false;
    [x: string]: any;
}
interface AsyncSchema extends _SchemaObject {
    $async: true;
}
declare type AnySchemaObject = SchemaObject | AsyncSchema;
declare type Schema = SchemaObject | boolean;
declare type AnySchema = Schema | AsyncSchema;
interface SourceCode {
    validateName: ValueScopeName;
    validateCode: string;
    scopeValues: ScopeValueSets;
    evaluated?: Code;
}
interface DataValidationCxt<T extends string | number = string | number> {
    instancePath: string;
    parentData: {
        [K in T]: any;
    };
    parentDataProperty: T;
    rootData: Record<string, any> | any[];
    dynamicAnchors: {
        [Ref in string]?: ValidateFunction;
    };
}
interface ValidateFunction<T = unknown> {
    (this: Ajv | any, data: any, dataCxt?: DataValidationCxt): data is T;
    errors?: null | ErrorObject[];
    evaluated?: Evaluated;
    schema: AnySchema;
    schemaEnv: SchemaEnv;
    source?: SourceCode;
}
declare type EvaluatedProperties = {
    [K in string]?: true;
} | true;
declare type EvaluatedItems = number | true;
interface Evaluated {
    props?: EvaluatedProperties;
    items?: EvaluatedItems;
    dynamicProps: boolean;
    dynamicItems: boolean;
}
interface AsyncValidateFunction<T = unknown> extends ValidateFunction<T> {
    (...args: Parameters<ValidateFunction<T>>): Promise<T>;
    $async: true;
}
declare type AnyValidateFunction<T = any> = ValidateFunction<T> | AsyncValidateFunction<T>;
interface ErrorObject<K extends string = string, P = Record<string, any>, S = unknown> {
    keyword: K;
    instancePath: string;
    schemaPath: string;
    params: P;
    propertyName?: string;
    message?: string;
    schema?: S;
    parentSchema?: AnySchemaObject;
    data?: unknown;
}
interface _KeywordDef {
    keyword: string | string[];
    type?: JSONType$1 | JSONType$1[];
    schemaType?: JSONType$1 | JSONType$1[];
    allowUndefined?: boolean;
    $data?: boolean;
    implements?: string[];
    before?: string;
    post?: boolean;
    metaSchema?: AnySchemaObject;
    validateSchema?: AnyValidateFunction;
    dependencies?: string[];
    error?: KeywordErrorDefinition;
    $dataError?: KeywordErrorDefinition;
}
interface CodeKeywordDefinition extends _KeywordDef {
    code: (cxt: KeywordCxt, ruleType?: string) => void;
    trackErrors?: boolean;
}
declare type MacroKeywordFunc = (schema: any, parentSchema: AnySchemaObject, it: SchemaCxt) => AnySchema;
declare type CompileKeywordFunc = (schema: any, parentSchema: AnySchemaObject, it: SchemaObjCxt) => DataValidateFunction;
interface DataValidateFunction {
    (...args: Parameters<ValidateFunction>): boolean | Promise<any>;
    errors?: Partial<ErrorObject>[];
}
interface SchemaValidateFunction {
    (schema: any, data: any, parentSchema?: AnySchemaObject, dataCxt?: DataValidationCxt): boolean | Promise<any>;
    errors?: Partial<ErrorObject>[];
}
interface FuncKeywordDefinition extends _KeywordDef {
    validate?: SchemaValidateFunction | DataValidateFunction;
    compile?: CompileKeywordFunc;
    schema?: boolean;
    modifying?: boolean;
    async?: boolean;
    valid?: boolean;
    errors?: boolean | "full";
}
interface MacroKeywordDefinition extends FuncKeywordDefinition {
    macro: MacroKeywordFunc;
}
declare type KeywordDefinition = CodeKeywordDefinition | FuncKeywordDefinition | MacroKeywordDefinition;
declare type AddedKeywordDefinition = KeywordDefinition & {
    type: JSONType$1[];
    schemaType: JSONType$1[];
};
interface KeywordErrorDefinition {
    message: string | Code | ((cxt: KeywordErrorCxt) => string | Code);
    params?: Code | ((cxt: KeywordErrorCxt) => Code);
}
declare type Vocabulary = (KeywordDefinition | string)[];
interface KeywordErrorCxt {
    gen: CodeGen;
    keyword: string;
    data: Name;
    $data?: string | false;
    schema: any;
    parentSchema?: AnySchemaObject;
    schemaCode: Code | number | boolean;
    schemaValue: Code | number | boolean;
    schemaType?: JSONType$1[];
    errsCount?: Name;
    params: KeywordCxtParams;
    it: SchemaCxt;
}
declare type KeywordCxtParams = {
    [P in string]?: Code | string | number;
};
declare type FormatValidator<T extends string | number> = (data: T) => boolean;
declare type FormatCompare<T extends string | number> = (data1: T, data2: T) => number | undefined;
declare type AsyncFormatValidator<T extends string | number> = (data: T) => Promise<boolean>;
interface FormatDefinition<T extends string | number> {
    type?: T extends string ? "string" | undefined : "number";
    validate: FormatValidator<T> | (T extends string ? string | RegExp : never);
    async?: false | undefined;
    compare?: FormatCompare<T>;
}
interface AsyncFormatDefinition<T extends string | number> {
    type?: T extends string ? "string" | undefined : "number";
    validate: AsyncFormatValidator<T>;
    async: true;
    compare?: FormatCompare<T>;
}
declare type AddedFormat = true | RegExp | FormatValidator<string> | FormatDefinition<string> | FormatDefinition<number> | AsyncFormatDefinition<string> | AsyncFormatDefinition<number>;
declare type Format = AddedFormat | string;
interface RegExpEngine {
    (pattern: string, u: string): RegExpLike;
    code: string;
}
interface RegExpLike {
    test: (s: string) => boolean;
}
interface UriResolver {
    parse(uri: string): URIComponents;
    resolve(base: string, path: string): string;
    serialize(component: URIComponents): string;
}

/**
 * Create a JSON Schema validator powered by Ajv.
 * @param schema
 * @param [schemaDefinitions=undefined]
 *                    An object containing JSON Schema definitions
 *                    which can be referenced using $ref
 * @param [ajvOptions] Optional extra options for Ajv
 * @return Returns a validation function
 */
declare function createAjvValidator(schema: JSONValue, schemaDefinitions?: JSONValue, ajvOptions?: Options): Validator;

declare const lodashQueryLanguage: QueryLanguage;

declare const javascriptQueryLanguage: QueryLanguage;

declare const jmespathQueryLanguage: QueryLanguage;

/**
 * Find enum options for given path in a JSONSchema
 * @param {JSON} schema
 * @param {JSON} [schemaDefinitions=undefined]
 * @param {Path} path
 * @returns {Array<any> | null}
 */
declare function getJSONSchemaOptions(schema: any, schemaDefinitions: any, path: any): any;
/**
 * find an enum definition in a JSON schema, as property `enum` or inside
 * one of the schemas composites (`oneOf`, `anyOf`, `allOf`)
 *
 * Source: https://github.com/josdejong/jsoneditor/blob/develop/src/js/Node.js
 *
 * @param  {Object} schema
 * @return {Array | null} Returns the enum when found, null otherwise.
 * @private
 */
declare function findEnum(schema: any): any;
/**
 * Return the part of a JSON schema matching given path.
 *
 * Source: https://github.com/josdejong/jsoneditor/blob/develop/src/js/Node.js
 *
 * @param {JSON} topLevelSchema
 * @param {JSON} schemaDefinitions
 * @param {Array.<string | number>} path
 * @param {Object} currentSchema
 * @return {Object | null}
 * @private
 */
declare function findSchema(topLevelSchema: any, schemaDefinitions: any, path: any, currentSchema?: any): any;

/**
 * Check whether content contains text (and not JSON)
 */
declare function isTextContent(content: Content): content is TextContent;
/**
 * Returns true when the (estimated) size of the contents exceeds the
 * provided maxSize.
 * @param content
 * @param maxSize  Maximum content size in bytes
 */
declare function isLargeContent(content: Content, maxSize: number): boolean;
/**
 * A rough, fast estimation on whether a document is larger than given size
 * when serialized.
 *
 * maxSize is an optional max size in bytes. When reached, size estimation will
 * be cancelled. This is useful when you're only interested in knowing whether
 * the size exceeds a certain maximum size.
 */
declare function estimateSerializedSize(content: Content, maxSize?: number): number;
/**
 * Check whether the actual functions of parse and stringify are strictly equal.
 * The object holding the functions may be a differing instance.
 */
declare function isEqualParser(a: JSONParser, b: JSONParser): boolean;

/**
 * Stringify a path like:
 *
 *     ["data", "2", "nested property", "name"]
 *
 * into a JSON path string like:
 *
 *     "$.data[2]['nested property'].name"
 */
declare function stringifyJSONPath(path: JSONPath): string;
/**
 * Parse a string into a JSONPath. For example the input:
 *
 *   "$.data[2]['nested property'].name"
 *
 * will return:
 *
 *   ["data", "2", "nested property", "name"]
 *
 */
declare function parseJSONPath(path: string): JSONPath;

declare function isAfterSelection(selection: JSONSelection | undefined): selection is AfterSelection;
declare function isInsideSelection(selection: JSONSelection | undefined): selection is InsideSelection;
declare function isKeySelection(selection: JSONSelection | undefined): selection is KeySelection;
declare function isValueSelection(selection: JSONSelection | undefined): selection is ValueSelection;
declare function isMultiSelection(selection: JSONSelection | undefined): selection is MultiSelection;
declare function createKeySelection(path: JSONPath, edit: boolean): KeySelection;
declare function createValueSelection(path: JSONPath, edit: boolean): ValueSelection;
declare function createInsideSelection(path: JSONPath): InsideSelection;
declare function createAfterSelection(path: JSONPath): AfterSelection;
declare function createMultiSelection(json: JSONValue, anchorPath: JSONPath, focusPath: JSONPath): MultiSelection;
declare function isEditingSelection(selection: JSONSelection): boolean;

export { AbsolutePopupOptions, AfterPatchCallback, AfterSelection, BooleanToggle, CaretPosition, CaretType, ClipboardValues, ColorPicker, Content, ContentErrors, ContentParseError, ContentValidationErrors, DocumentState, DragInsideAction, DragInsideProps, DraggingState, DropdownButtonItem, EditableValue, EnumValue, EscapeValue, ExtendedSearchResultItem, FontAwesomeIcon, HistoryItem, InsertType, InsideSelection, JSONContent, JsonEditor as JSONEditor, JSONEditorPropsOptional, JSONNodeItem, JSONNodeProp, JSONParser, JSONPatchDocument, JSONPatchResult, JSONPath, JSONPathParser, JSONPointer, JSONPointerMap, JSONSelection, JSONValue, KeySelection, MenuButtonItem, MenuItem, MenuSeparatorItem, MenuSpaceItem, MessageAction, Mode, MultiSelection, NestedValidationError, OnBlur, OnChange, OnChangeMode, OnChangeQueryLanguage, OnChangeStatus, OnClassName, OnContextMenu, OnError, OnFind, OnFocus, OnPaste, OnPasteJson, OnPatch, OnRenderMenu, OnRenderValue, OnSelect, OnSort, ParseError, PastedJson, PopupEntry, QueryLanguage, QueryLanguageOptions, ReadonlyValue, RenderValueComponentDescription, RenderValueProps, RenderValuePropsOptional, RenderedItem, RichValidationError, SearchField, SearchResult, SearchResultItem, Section, SelectionType, SortModal, SortModalCallback, TextContent, TextLocation, TimestampTag, TransformModal, TransformModalCallback, TransformModalOptions, TreeModeContext, UnescapeValue, ValidationError$1 as ValidationError, ValidationSeverity, Validator, ValueNormalization, ValueSelection, VisibleSection, compileJSONPointer, compileJSONPointerProp, createAfterSelection, createAjvValidator, createInsideSelection, createKeySelection, createMultiSelection, createValueSelection, deleteIn, estimateSerializedSize, existsIn, findEnum, findSchema, getIn, getJSONSchemaOptions, immutableJSONPatch, insertAt, isAfterSelection, isEditingSelection, isEqualParser, isInsideSelection, isKeySelection, isLargeContent, isMultiSelection, isTextContent, isValueSelection, javascriptQueryLanguage, jmespathQueryLanguage, lodashQueryLanguage, parseFrom, parseJSONPath, parseJSONPointer, parsePath, renderJSONSchemaEnum, renderValue, revertJSONPatch, setIn, stringifyJSONPath, updateIn };
