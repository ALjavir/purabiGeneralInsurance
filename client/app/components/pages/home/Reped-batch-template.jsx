// #target illustrator;

/*
    MULTI TEMPLATE BATCH AUTO COMPLETE
    MANY SETS x 13 SOURCE FILES -> MANY FINAL EPS FILES

    HOW TO NAME THE SOURCE FILES
    ----------------------------
    Put all traced/expanded source files for all template sets in ONE folder.

    Each set must have the SAME base name plus a trailing number.
    Examples:
        BEAUTY 1.ai
        BEAUTY 2.ai
        ...
        BEAUTY 13.ai

        BUSINESS_VALUE_01.eps
        BUSINESS_VALUE_02.eps
        ...
        BUSINESS_VALUE_13.eps

        TRAVEL-1.ai
        TRAVEL-2.ai
        ...
        TRAVEL-13.ai

    The script automatically groups files by their base name.

    WORKFLOW
    --------
    1) Ask ONCE for the demo template (AI / EPS).
    2) Ask ONCE for the master source folder.
    3) Detect all source sets automatically.
    4) RESUME MODE:
       - if <SET NAME>.eps already exists in the master folder,
         that set is skipped automatically.
       - completed output is never rebuilt or overwritten.
    5) For EACH unfinished set:
       - expects 13 source files
       - opens only ONE source file at a time
       - runs the same full V9 processing workflow
       - builds 52 icons
       - uses the V9 tighter grid / bigger icon layout
       - creates the white hero icon
       - creates exactly 3 white text lines:
           line 1 = set/template name
           line 2 = ICON SET
           line 3 = 50 Icons & Editable Stocks
       - uses Roboto ExtraBold when available
       - keeps %20 cleanup
       - smoothing OFF
       - saves EPS as Adobe Illustrator 10 compatible
       - output goes to the SAME master source folder
       - closes the finished template before starting the next set
       - rerunning the JSX skips this completed EPS automatically

    PERFORMANCE
    -----------
    - only one source file is open at a time
    - only one output template is open per set
    - streaming alignment: each icon is copied/recolored/aligned immediately
    - no final 52-icon mass-alignment pass
*/

export default function RepedBatchTemplate() {

    // =========================================================
    // SETTINGS
    // =========================================================
    var EXPECTED_SOURCE_FILES = 13;
    var ICONS_PER_SOURCE = 4;
    var EXPECTED_TOTAL_ICONS = 52;

    // Final layout:
    // 5 horizontal rows, 10 icons per row = 50 icons.
    // The remaining 2 icons are placed in a separate right-side column.
    var GRID_COLUMNS = 10;
    var GRID_ROWS = 5;

    // Right-side icon grid placement as a percentage of the template artboard.
    // These values follow the visual proportions of the supplied template.
    var GRID_LEFT_PCT   = 0.265;
    var GRID_RIGHT_PCT  = 0.995;   // use the full white template area
    var GRID_TOP_PCT    = 0.000;
    var GRID_BOTTOM_PCT = 1.000;

    // TIGHTER REFERENCE GRID MODE
    // Regular 10 x 5 cell centers with reduced row/column gaps.
    // No edge-stretch distribution; spacing stays even.
    var ICON_WIDTH_IN_CELL_PCT = 0.72;
    var ICON_HEIGHT_IN_CELL_PCT = 0.70;

    // Hero / text proportions tuned to the supplied reference.
    var HERO_LEFT_PCT   = 0.045;
    var HERO_RIGHT_PCT  = 0.210;
    var HERO_TOP_PCT    = 0.035;
    var HERO_BOTTOM_PCT = 0.500;

    // EXACTLY THREE TEXT LINES:
    // Line 1 = template/source name
    // Line 2 = ICON SET
    // Line 3 = 50 Icons & Editable Stocks
    var TITLE_CENTER_X_PCT = 0.118;

    var TITLE_LINE1_CENTER_Y_PCT = 0.615;
    var TITLE_LINE2_CENTER_Y_PCT = 0.705;

    var TITLE_LINE1_SIZE_PCT = 0.069;
    var TITLE_LINE2_SIZE_PCT = 0.056;

    var TITLE_MAX_WIDTH_PCT = 0.215;
    var TITLE_LINE_MAX_HEIGHT_PCT = 0.095;

    // Third line stays in the bottom/footer strip.
    var FOOTER_CENTER_X_PCT = 0.108;
    var FOOTER_CENTER_Y_PCT = 0.932;
    var FOOTER_SIZE_PCT = 0.041;
    var FOOTER_MAX_WIDTH_PCT = 0.205;

    // Existing demo-content cleanup regions.
    var CLEAN_GRID_LEFT_PCT = 0.255;
    var CLEAN_GRID_RIGHT_PCT = 1.005;
    var CLEAN_GRID_TOP_PCT = 0.015;
    var CLEAN_GRID_BOTTOM_PCT = 0.985;

    // Icons 51 and 52 must stay OUTSIDE the template/artboard.
    // Their exact X position is calculated from the final grid cell width.
    var EXTRA_OUTSIDE_GAP_CELLS = 0.80;
    var EXTRA_Y1_PCT = 0.38;
    var EXTRA_Y2_PCT = 0.62;

    // White detection after Divide.
    var WHITE_RGB_MIN = 248;
    var WHITE_CMYK_MAX = 3;
    var WHITE_GRAY_MIN = 97;

    var ICON_NAME_PREFIX = "Icon_";

    // Final icon color: #31313F
    var ICON_RGB_R = 49;
    var ICON_RGB_G = 49;
    var ICON_RGB_B = 63;

    // IMPORTANT: smoothing is completely disabled.
    // No anchor-point smoothing, no curve smoothing, no Simplify command.
    var SMOOTHING_ENABLED = false;

    // =========================================================
    // SAFE / SLOW MODE
    // =========================================================
    // Keeps the same Pathfinder workflow, but gives Illustrator
    // time to finish each heavy operation before starting the next.
    var SAFE_SLOW_MODE = true;

    var DELAY_AFTER_OPEN_MS = 70;
    var DELAY_BEFORE_PATHFINDER_MS = 25;
    var DELAY_AFTER_DIVIDE_MS = 180;
    var DELAY_AFTER_EXPAND_MS = 70;
    var DELAY_AFTER_UNGROUP_MS = 8;
    var DELAY_AFTER_WHITE_REMOVE_MS = 40;

    var DELAY_AFTER_UNITE_MS = 130;
    var DELAY_AFTER_UNITE_EXPAND_MS = 60;
    var DELAY_AFTER_ICON_GROUP_MS = 15;

    var DELAY_AFTER_COPY_MS = 8;
    var DELAY_BETWEEN_FILES_MS = 160;

    // ALIGNMENT SAFETY
    // Complex traced groups can freeze Illustrator when visibleBounds is
    // queried repeatedly during resize + align. This version uses geometric
    // bounds once per icon, then resizes and translates from that single read.
    var ALIGN_BATCH_SIZE = 5;
    var ALIGN_BATCH_PAUSE_MS = 180;

    // Lower than the previous 25-pass limit to avoid very deep repeated
    // Ungroup loops on heavy traced artwork.
    var MAX_UNGROUP_PASSES = 5;

    // =========================================================


    // =========================================================
    // 1) DEMO TEMPLATE
    // =========================================================
    var demoTemplateFile = File.openDialog(
        "Select DEMO TEMPLATE file (AI or EPS)",
        "Illustrator Template Files:*.ai;*.eps"
    );

    if (!demoTemplateFile) {
        alert("Cancelled. No demo template selected.");
        return;
    }

    if (!/\.(ai|eps)$/i.test(demoTemplateFile.name)) {
        alert("Please select an AI or EPS demo template.");
        return;
    }


    // =========================================================
    // 2) MASTER SOURCE FOLDER
    // =========================================================
    var inputFolder = Folder.selectDialog(
        "Select MASTER folder containing ALL traced + expanded source files"
    );

    if (!inputFolder) {
        alert("Cancelled. No source folder selected.");
        return;
    }

    // Output is the same master source folder.
    var outputFolder = inputFolder;


    // =========================================================
    // FIND ALL SOURCE FILES
    // =========================================================
    var demoTemplateCanonical = "";

    try {
        demoTemplateCanonical =
            demoTemplateFile.fsName.toLowerCase();
    } catch (eTemplatePath) {}

    var allFiles = inputFolder.getFiles(function (f) {

        if (!(f instanceof File)) return false;

        if (!/\.(ai|eps|pdf|svg)$/i.test(f.name)) {
            return false;
        }

        // Never process the selected demo template as source artwork.
        try {
            if (
                demoTemplateCanonical !== "" &&
                f.fsName.toLowerCase() ===
                demoTemplateCanonical
            ) {
                return false;
            }
        } catch (ePath) {}

        return true;
    });

    if (!allFiles || allFiles.length === 0) {
        alert(
            "No supported source files found.\n\n" +
            "Supported: AI, EPS, PDF, SVG"
        );
        return;
    }

    allFiles.sort(function (a, b) {
        return naturalCompare(a.name, b.name);
    });


    // =========================================================
    // GROUP FILES BY BASE NAME
    // =========================================================
    // Examples:
    // BEAUTY 1.ai ... BEAUTY 13.ai        -> BEAUTY
    // BUSINESS_VALUE_01.eps ... _13.eps   -> BUSINESS VALUE
    // TRAVEL-1.ai ... TRAVEL-13.ai        -> TRAVEL
    var groupMap = {};
    var groupOrder = [];

    for (var af = 0; af < allFiles.length; af++) {

        var info =
            deriveBatchGroupInfo(
                allFiles[af]
            );

        if (!info || info.baseKey === "") {
            continue;
        }

        if (!groupMap[info.baseKey]) {
            groupMap[info.baseKey] = {
                key: info.baseKey,
                displayName: info.displayName,
                files: []
            };

            groupOrder.push(info.baseKey);
        }

        groupMap[info.baseKey]
            .files
            .push({
                file: allFiles[af],
                sequence: info.sequence
            });
    }


    // Sort each set numerically by the trailing sequence number.
    for (var go = 0; go < groupOrder.length; go++) {

        var g =
            groupMap[
                groupOrder[go]
            ];

        g.files.sort(
            function (a, b) {

                if (
                    a.sequence !== null &&
                    b.sequence !== null
                ) {
                    return (
                        a.sequence -
                        b.sequence
                    );
                }

                return naturalCompare(
                    a.file.name,
                    b.file.name
                );
            }
        );
    }


    if (groupOrder.length === 0) {
        alert(
            "No numbered source sets were detected.\n\n" +
            "Example naming:\n" +
            "BEAUTY 1.ai ... BEAUTY 13.ai"
        );
        return;
    }


    // =========================================================
    // BATCH REPORT STATE
    // =========================================================
    var completedSets = 0;
    var skippedSets = 0;
    var alreadyCompletedSets = 0;
    var globalWarnings = [];


    // =========================================================
    // PROCESS EVERY DETECTED SET
    // =========================================================
    for (
        var groupIndex = 0;
        groupIndex < groupOrder.length;
        groupIndex++
    ) {

        var currentGroup =
            groupMap[
                groupOrder[groupIndex]
            ];

        var files = [];

        for (
            var gf = 0;
            gf < currentGroup.files.length;
            gf++
        ) {
            files.push(
                currentGroup.files[gf].file
            );
        }

        // -----------------------------------------------------
        // RESUME MODE — SKIP ALREADY COMPLETED SETS
        // -----------------------------------------------------
        // If <SET NAME>.eps already exists in the master folder,
        // treat that set as finished and skip it immediately.
        var expectedOutputBase =
            cleanDisplayText(
                currentGroup.displayName
            );

        var expectedOutputFile =
            new File(
                outputFolder.fsName +
                "/" +
                sanitizeFileName(
                    expectedOutputBase
                ) +
                ".eps"
            );

        if (expectedOutputFile.exists) {

            alreadyCompletedSets++;

            // Do not open the template or any source file for this set.
            continue;
        }


        // A valid template set should contain exactly 13 source files.
        if (files.length !== EXPECTED_SOURCE_FILES) {

            skippedSets++;

            globalWarnings.push(
                currentGroup.displayName +
                " — expected " +
                EXPECTED_SOURCE_FILES +
                " files, found " +
                files.length +
                ". Skipped."
            );

            continue;
        }


        // Clean group/template title.
        var setTitle =
            cleanDisplayText(
                currentGroup.displayName
            ).toUpperCase();

        var displayTitle =
            cleanDisplayText(
                setTitle
            );


        // -----------------------------------------------------
        // OPEN A FRESH COPY OF THE DEMO TEMPLATE FOR THIS SET
        // -----------------------------------------------------
        var templateDoc = null;

        try {
            templateDoc =
                app.open(
                    demoTemplateFile
                );
        } catch (eOpenTemplate) {

            skippedSets++;

            globalWarnings.push(
                currentGroup.displayName +
                " — could not open demo template: " +
                eOpenTemplate.message
            );

            continue;
        }

        app.activeDocument =
            templateDoc;

        unlockShowAll(
            templateDoc
        );

        clearSelection(
            templateDoc
        );

        var artboardIndex =
            templateDoc.artboards
                .getActiveArtboardIndex();

        var ar =
            templateDoc.artboards[
                artboardIndex
            ].artboardRect;

        var abLeft = ar[0];
        var abTop = ar[1];
        var abRight = ar[2];
        var abBottom = ar[3];

        var abWidth =
            abRight - abLeft;

        var abHeight =
            abTop - abBottom;


        // Clean existing demo icons/text but preserve the template background/layout.
        cleanupDemoContent(
            templateDoc,
            abLeft,
            abTop,
            abRight,
            abBottom
        );


        var iconLayer =
            templateDoc.layers.add();

        iconLayer.name =
            "AUTO FINAL ICONS";


        var textLayer =
            templateDoc.layers.add();

        textLayer.name =
            "AUTO TITLE & FOOTER";


        // V9 tighter grid / bigger icon geometry.
        var gridLeft =
            abLeft +
            (abWidth * GRID_LEFT_PCT);

        var gridRight =
            abLeft +
            (abWidth * GRID_RIGHT_PCT);

        var gridTop =
            abTop -
            (abHeight * GRID_TOP_PCT);

        var gridBottom =
            abTop -
            (abHeight * GRID_BOTTOM_PCT);

        var gridWidth =
            gridRight - gridLeft;

        var gridHeight =
            gridTop - gridBottom;

        var cols =
            GRID_COLUMNS;

        var rows =
            GRID_ROWS;

        var cellW =
            gridWidth / cols;

        var cellH =
            gridHeight / rows;

        var maxIconW =
            cellW *
            ICON_WIDTH_IN_CELL_PCT;

        var maxIconH =
            cellH *
            ICON_HEIGHT_IN_CELL_PCT;

        var extraCenterX =
            abRight +
            (cellW *
             EXTRA_OUTSIDE_GAP_CELLS);


        var templateIcons = [];
        var warnings = [];


    // =========================================================
    // PROCESS EVERY ICON SOURCE
    // =========================================================
    for (var f = 0; f < files.length; f++) {

        var sourceFile = files[f];
        var sourceDoc = null;

        // STRICT SEQUENTIAL MODE:
        // previous source must be closed before this app.open().
        try { $.gc(); } catch (eBeforeOpenGC) {}
        safePause(35, false);

        try {

            sourceDoc = app.open(sourceFile);

            safePause(DELAY_AFTER_OPEN_MS, false);

            unlockShowAll(sourceDoc);
            clearSelection(sourceDoc);

            try {
                app.executeMenuCommand("selectall");
            } catch (eSelect) {}

            var initialItems = copySelection(sourceDoc.selection);

            if (initialItems.length === 0) {
                warnings.push(sourceFile.name + " — no selectable artwork.");
                closeNoSave(sourceDoc);
                continue;
            }

            var sourceBounds = boundsOfItems(initialItems);

            if (!sourceBounds) {
                warnings.push(sourceFile.name + " — cannot read artwork bounds.");
                closeNoSave(sourceDoc);
                continue;
            }


            // -------------------------------------------------
            // PATHFINDER DIVIDE
            // -------------------------------------------------
            try {
                safePause(DELAY_BEFORE_PATHFINDER_MS, false);
                app.executeMenuCommand("group");
                safePause(DELAY_BEFORE_PATHFINDER_MS, false);
            } catch (eGroupBeforeDivide) {}

            try {
                // Heavy step 1: Divide
                app.executeMenuCommand("Live Pathfinder Divide");
                safePause(DELAY_AFTER_DIVIDE_MS, true);

                // Expand after Illustrator has settled.
                app.executeMenuCommand("expandStyle");
                safePause(DELAY_AFTER_EXPAND_MS, false);

            } catch (eDivide) {
                warnings.push(sourceFile.name + " — Pathfinder Divide failed.");
                closeNoSave(sourceDoc);
                safePause(DELAY_BETWEEN_FILES_MS, false);
                continue;
            }


            // -------------------------------------------------
            // UNGROUP — paced
            // -------------------------------------------------
            ungroupSelectedDeep(sourceDoc, MAX_UNGROUP_PASSES);


            // -------------------------------------------------
            // REMOVE WHITE
            // -------------------------------------------------
            removeWhiteFromSelection(sourceDoc);
            safePause(DELAY_AFTER_WHITE_REMOVE_MS, false);

            // Flatten remaining Divide result, but do it slowly.
            ungroupSelectedDeep(sourceDoc, MAX_UNGROUP_PASSES);

            var remaining = copySelection(sourceDoc.selection);

            if (remaining.length === 0) {
                warnings.push(
                    sourceFile.name +
                    " — nothing remained after white background removal."
                );
                closeNoSave(sourceDoc);
                continue;
            }


            // -------------------------------------------------
            // DETECT 4 ICONS FROM 2 x 2 SOURCE LAYOUT
            // -------------------------------------------------
            var left = sourceBounds[0];
            var top = sourceBounds[1];
            var right = sourceBounds[2];
            var bottom = sourceBounds[3];

            var midX = (left + right) / 2;
            var midY = (top + bottom) / 2;

            // 0 TL, 1 TR, 2 BL, 3 BR
            var buckets = [[], [], [], []];

            for (var i = 0; i < remaining.length; i++) {

                var item = remaining[i];
                var b = safeBounds(item);

                if (!b) continue;

                var cx = (b[0] + b[2]) / 2;
                var cy = (b[1] + b[3]) / 2;

                var col = (cx < midX) ? 0 : 1;
                var row = (cy > midY) ? 0 : 1;

                buckets[(row * 2) + col].push(item);
            }


            // -------------------------------------------------
            // UNITE EACH INDIVIDUAL ICON
            // -------------------------------------------------
            for (var q = 0; q < ICONS_PER_SOURCE; q++) {

                if (buckets[q].length === 0) {
                    warnings.push(
                        sourceFile.name +
                        " — icon position " + (q + 1) +
                        " is empty."
                    );
                    continue;
                }

                selectItems(sourceDoc, buckets[q]);

                try {
                    app.executeMenuCommand("group");
                    safePause(DELAY_BEFORE_PATHFINDER_MS, false);
                } catch (ePreUnite) {}

                try {
                    // Heavy step 2: Unite this ONE icon only.
                    app.executeMenuCommand("Live Pathfinder Add");
                    safePause(DELAY_AFTER_UNITE_MS, true);

                    app.executeMenuCommand("expandStyle");
                    safePause(DELAY_AFTER_UNITE_EXPAND_MS, false);

                } catch (eUnite) {
                    // Keep original parts if Pathfinder Add cannot expand
                    // a special object type.
                }

                // User requested Ungroup after Unite.
                ungroupSelectedDeep(sourceDoc, MAX_UNGROUP_PASSES);

                var iconParts = copySelection(sourceDoc.selection);

                if (iconParts.length === 0) {
                    warnings.push(
                        sourceFile.name +
                        " — icon position " + (q + 1) +
                        " produced no artwork."
                    );
                    continue;
                }

                // One single icon = one group.
                var finalIcon = groupItemsDOM(
                    sourceDoc,
                    iconParts,
                    sourceDoc.activeLayer
                );

                if (!finalIcon) continue;

                safePause(DELAY_AFTER_ICON_GROUP_MS, false);


                // -------------------------------------------------
                // STREAM DIRECTLY TO FINAL DOCUMENT
                // -------------------------------------------------
                // This avoids keeping 52 processed icons in a temporary
                // document and then duplicating/aliging all 52 again later.
                var copied = duplicateItemToDocument(
                    finalIcon,
                    sourceDoc,
                    templateDoc,
                    iconLayer
                );

                if (copied) {

                    var finalIndex =
                        templateIcons.length;

                    copied.name =
                        ICON_NAME_PREFIX +
                        pad2(finalIndex + 1);

                    // Work on only this one destination icon.
                    app.activeDocument = templateDoc;

                    recolorArtworkRGB(
                        copied,
                        ICON_RGB_R,
                        ICON_RGB_G,
                        ICON_RGB_B
                    );

                    placeFinalIconByIndex(
                        copied,
                        finalIndex,
                        gridLeft,
                        gridTop,
                        cellW,
                        cellH,
                        maxIconW,
                        maxIconH,
                        extraCenterX,
                        abTop,
                        abHeight
                    );

                    templateIcons.push(copied);

                    // Return immediately to the source document.
                    app.activeDocument = sourceDoc;

                    // Lighter cleanup every 8 completed icons.
                    // File-level cleanup is still retained for stability.
                    if ((templateIcons.length % 8) === 0) {
                        try { $.gc(); } catch (eStreamGC) {}
                        safePause(45, false);
                    }

                    safePause(
                        DELAY_AFTER_COPY_MS,
                        false
                    );
                }
            }

            // -------------------------------------------------
            // FINISH + CLOSE CURRENT SOURCE BEFORE NEXT FILE
            // -------------------------------------------------
            clearSelection(sourceDoc);

            try {
                app.activeDocument = templateDoc;
            } catch (eFocusTemplate) {}

            closeNoSave(sourceDoc);
            sourceDoc = null;

            try { $.gc(); } catch (eBatchGC) {}

            safePause(
                DELAY_BETWEEN_FILES_MS,
                false
            );

        } catch (err) {

            warnings.push(
                sourceFile.name +
                " — " +
                err.message
            );

            if (sourceDoc) {
                try {
                    clearSelection(sourceDoc);
                } catch (eClearBadDoc) {}

                try {
                    app.activeDocument = templateDoc;
                } catch (eFocusAfterError) {}

                try {
                    closeNoSave(sourceDoc);
                } catch (eClose) {}

                sourceDoc = null;
            }

            try { $.gc(); } catch (eErrorGC) {}
            safePause(
                DELAY_BETWEEN_FILES_MS,
                false
            );
        }
    }


    // =========================================================
    // CHECK THIS SET
    // =========================================================
    if (templateIcons.length === 0) {

        try {
            templateDoc.close(
                SaveOptions.DONOTSAVECHANGES
            );
        } catch (eCloseEmpty) {}

        skippedSets++;

        globalWarnings.push(
            currentGroup.displayName +
            " — no icons were created."
        );

        continue;
    }

    // All alignment has already been completed progressively,
    // one icon at a time.
    app.activeDocument =
        templateDoc;

    try { $.gc(); }
    catch (eBeforeSaveStageGC) {}

    safePause(
        100,
        false
    );


    // =========================================================
    // COMPLETE LEFT SIDE OF THE TEMPLATE
    // =========================================================

    // ---------------------------------------------------------
    // LARGE WHITE HERO ICON
    // ---------------------------------------------------------
    if (templateIcons.length > 0) {

        var hero =
            templateIcons[0].duplicate(
                iconLayer,
                ElementPlacement.PLACEATBEGINNING
            );

        hero.name = "AUTO HERO ICON";

        recolorArtworkWhite(hero);

        var heroLeft =
            abLeft +
            (abWidth * HERO_LEFT_PCT);

        var heroRight =
            abLeft +
            (abWidth * HERO_RIGHT_PCT);

        var heroTop =
            abTop -
            (abHeight * HERO_TOP_PCT);

        var heroBottom =
            abTop -
            (abHeight * HERO_BOTTOM_PCT);

        fitAndCenterFast(
            hero,
            heroRight - heroLeft,
            heroTop - heroBottom,
            (heroLeft + heroRight) / 2,
            (heroTop + heroBottom) / 2
        );
    }


    // ---------------------------------------------------------
    // TEXT LINE 1 — TEMPLATE / SOURCE NAME
    // ---------------------------------------------------------
    var titleFrame =
        textLayer.textFrames.add();

    titleFrame.contents =
        cleanDisplayText(
            displayTitle
        );

    var titleLine1FontSize =
        Math.max(
            18,
            abHeight * TITLE_LINE1_SIZE_PCT
        );

    applyCenteredTextStyle(
        titleFrame,
        titleLine1FontSize,
        getRobotoExtraBoldFont(),
        true
    );

    setTextTracking(
        titleFrame,
        0
    );

    // Keep the template name on ONE single line.
    fitTextFrameToBox(
        titleFrame,
        abWidth * TITLE_MAX_WIDTH_PCT,
        abHeight * TITLE_LINE_MAX_HEIGHT_PCT,
        16
    );

    // ALL generated text is white.
    setTextFillRGB(
        titleFrame,
        255,
        255,
        255
    );

    centerTextFrameAt(
        titleFrame,
        abLeft +
            (abWidth * TITLE_CENTER_X_PCT),
        abTop -
            (abHeight * TITLE_LINE1_CENTER_Y_PCT)
    );


    // ---------------------------------------------------------
    // TEXT LINE 2 — ICON SET
    // ---------------------------------------------------------
    var iconSetFrame =
        textLayer.textFrames.add();

    iconSetFrame.contents =
        "ICON SET";

    var titleLine2FontSize =
        Math.max(
            16,
            abHeight * TITLE_LINE2_SIZE_PCT
        );

    applyCenteredTextStyle(
        iconSetFrame,
        titleLine2FontSize,
        getRobotoExtraBoldFont(),
        true
    );

    setTextTracking(
        iconSetFrame,
        0
    );

    fitTextFrameToBox(
        iconSetFrame,
        abWidth * TITLE_MAX_WIDTH_PCT,
        abHeight * TITLE_LINE_MAX_HEIGHT_PCT,
        14
    );

    setTextFillRGB(
        iconSetFrame,
        255,
        255,
        255
    );

    centerTextFrameAt(
        iconSetFrame,
        abLeft +
            (abWidth * TITLE_CENTER_X_PCT),
        abTop -
            (abHeight * TITLE_LINE2_CENTER_Y_PCT)
    );


    // ---------------------------------------------------------
    // TEXT LINE 3 — 50 ICONS & EDITABLE STOCKS
    // ---------------------------------------------------------
    // There are 50 icons inside the template and 2 extra outside,
    // so the template footer stays exactly "50 Icons & Editable Stocks".
    var footerFrame =
        textLayer.textFrames.add();

    footerFrame.contents =
        "50 Icons & Editable Stocks";

    var footerFontSize =
        Math.max(
            13,
            abHeight * FOOTER_SIZE_PCT
        );

    applyCenteredTextStyle(
        footerFrame,
        footerFontSize,
        getRobotoExtraBoldFont(),
        false
    );

    setTextTracking(
        footerFrame,
        0
    );

    fitTextFrameToBox(
        footerFrame,
        abWidth * FOOTER_MAX_WIDTH_PCT,
        abHeight * 0.080,
        11
    );

    // User requested ALL THREE text lines in WHITE.
    setTextFillRGB(
        footerFrame,
        255,
        255,
        255
    );

    centerTextFrameAt(
        footerFrame,
        abLeft +
            (abWidth * FOOTER_CENTER_X_PCT),
        abTop -
            (abHeight * FOOTER_CENTER_Y_PCT)
    );


    try { $.gc(); } catch (eBeforeFinalSaveGC) {}
    safePause(120, true);


    // =========================================================
    // SAVE FINAL EPS
    // =========================================================
    // Use the source icon filename directly for the final EPS name.
    // Remove only a trailing Windows-style copy marker such as " (1)", " (5)", etc.
    // Do NOT add any suffix and do NOT create automatic "_2" / "(1)" variants.
    var outputBase =
        expectedOutputBase;

    var epsFile =
        expectedOutputFile;

    // Exact-name behavior: no "(1)", "_2", or other suffixes.
    // Safety: never delete one of the actual source files.
    var outputPathLower = epsFile.fsName.toLowerCase();
    var conflictsWithSource = false;

    for (var cf = 0; cf < files.length; cf++) {
        try {
            if (files[cf].fsName.toLowerCase() === outputPathLower) {
                conflictsWithSource = true;
                break;
            }
        } catch (eConflictCheck) {}
    }

    if (conflictsWithSource) {
        alert(
            "The final EPS name is the same as one of the source files:\n\n" +
            epsFile.fsName +
            "\n\nRename that source file first, then run the script again."
        );
        try {
            templateDoc.close(SaveOptions.DONOTSAVECHANGES);
        } catch (eCloseConflict) {}
        return;
    }

    if (epsFile.exists) {

        alreadyCompletedSets++;

        try {
            templateDoc.close(
                SaveOptions.DONOTSAVECHANGES
            );
        } catch (eCloseExistingOutput) {}

        templateDoc = null;

        try { $.gc(); }
        catch (eExistingOutputGC) {}

        continue;
    }

    var epsOptions = new EPSSaveOptions();

    // Force final EPS compatibility to Adobe Illustrator 10.
    try {
        epsOptions.compatibility =
            Compatibility.ILLUSTRATOR10;
    } catch (eCompatibility) {}

    try {
        epsOptions.includeDocumentThumbnails = true;
    } catch (eThumb) {}

    try {
        epsOptions.embedAllFonts = true;
    } catch (eFonts) {}

    try {
        epsOptions.saveMultipleArtboards = false;
    } catch (eMultiAB) {}

    safePause(90, true);
    try { $.gc(); } catch (eBeforeSaveGC) {}

    templateDoc.saveAs(
        epsFile,
        epsOptions
    );

    safePause(120, false);


    // =========================================================
    // FINISH THIS SET
    // =========================================================
    clearSelection(
        templateDoc
    );

    safePause(
        50,
        true
    );


    // Copy this set's warnings into the global batch report.
    if (warnings.length > 0) {

        for (
            var ww = 0;
            ww < warnings.length;
            ww++
        ) {

            globalWarnings.push(
                currentGroup.displayName +
                " — " +
                warnings[ww]
            );
        }
    }


    // Save is complete; close this output template before the next set.
    try {
        templateDoc.close(
            SaveOptions.DONOTSAVECHANGES
        );
    } catch (eCloseFinalTemplate) {}

    templateDoc = null;

    completedSets++;

    try { $.gc(); }
    catch (eAfterSetGC) {}

    safePause(
        250,
        false
    );

    } // END FOR EACH DETECTED SET


    // =========================================================
    // FINAL BATCH REPORT
    // =========================================================
    var result =
        "Batch Finished.\n\n" +
        "Detected sets: " +
        groupOrder.length +
        "\n" +
        "Completed this run: " +
        completedSets +
        "\n" +
        "Already completed / skipped: " +
        alreadyCompletedSets +
        "\n" +
        "Incomplete/error sets skipped: " +
        skippedSets +
        "\n" +
        "Expected source files per set: " +
        EXPECTED_SOURCE_FILES +
        "\n" +
        "Expected icons per completed set: " +
        EXPECTED_TOTAL_ICONS +
        "\n" +
        "Grid: V9 tighter grid / bigger icons\n" +
        "Text: 3 white lines, Roboto ExtraBold\n" +
        "Smoothing: OFF\n" +
        "Source opening: STRICT SEQUENTIAL\n" +
        "Output folder: MASTER SOURCE FOLDER\n" +
        "EPS compatibility: Illustrator 10\n" +
        "Resume mode: SKIP EXISTING COMPLETED EPS";

    if (globalWarnings.length > 0) {

        result +=
            "\n\nWarnings (" +
            globalWarnings.length +
            "):\n";

        for (
            var gw = 0;
            gw < globalWarnings.length &&
            gw < 20;
            gw++
        ) {

            result +=
                "- " +
                globalWarnings[gw] +
                "\n";
        }

        if (globalWarnings.length > 20) {

            result +=
                "...and " +
                (globalWarnings.length - 20) +
                " more.";
        }
    }

    alert(result);



    // =========================================================
    // HELPERS
    // =========================================================

    function cleanupDemoContent(
        doc,
        abLeft,
        abTop,
        abRight,
        abBottom
    ) {

        // Remove ALL existing live text from the demo first.
        // New title/footer are generated later by this script.
        try {
            for (
                var tf = doc.textFrames.length - 1;
                tf >= 0;
                tf--
            ) {
                try {
                    doc.textFrames[tf].remove();
                } catch (eRemoveText) {}
            }
        } catch (eTextCleanup) {}

        var abWidth =
            abRight - abLeft;

        var abHeight =
            abTop - abBottom;

        // Work backwards because matching objects are removed.
        for (
            var i = doc.pageItems.length - 1;
            i >= 0;
            i--
        ) {

            var item = doc.pageItems[i];

            var b =
                fastGeometricBounds(item);

            if (!b) continue;

            var w =
                b[2] - b[0];

            var h =
                b[1] - b[3];

            if (w <= 0 || h <= 0) {
                continue;
            }

            var cx =
                (b[0] + b[2]) / 2;

            var cy =
                (b[1] + b[3]) / 2;

            var xPct =
                (cx - abLeft) /
                abWidth;

            var yPct =
                (abTop - cy) /
                abHeight;

            var wPct =
                w / abWidth;

            var hPct =
                h / abHeight;

            var removeIt = false;

            // Main icon grid of a completed demo.
            if (
                xPct >= CLEAN_GRID_LEFT_PCT &&
                xPct <= CLEAN_GRID_RIGHT_PCT &&
                yPct >= CLEAN_GRID_TOP_PCT &&
                yPct <= CLEAN_GRID_BOTTOM_PCT &&
                wPct < 0.14 &&
                hPct < 0.22
            ) {
                removeIt = true;
            }

            // Hero sample icon area.
            if (
                xPct >= 0.025 &&
                xPct <= 0.235 &&
                yPct >= 0.015 &&
                yPct <= 0.405 &&
                wPct < 0.22 &&
                hPct < 0.39
            ) {
                removeIt = true;
            }

            // Existing/outlined title area.
            if (
                xPct >= 0.010 &&
                xPct <= 0.245 &&
                yPct >= 0.385 &&
                yPct <= 0.665 &&
                wPct < 0.235 &&
                hPct < 0.28
            ) {
                removeIt = true;
            }

            // Existing/outlined footer text area.
            // The large yellow footer background is much taller/wider
            // and therefore is not removed by these small-object limits.
            if (
                xPct >= 0.005 &&
                xPct <= 0.250 &&
                yPct >= 0.655 &&
                yPct <= 0.840 &&
                wPct < 0.235 &&
                hPct < 0.10
            ) {
                removeIt = true;
            }

            if (removeIt) {
                try {
                    item.remove();
                } catch (eRemoveDemo) {}
            }
        }

        clearSelection(doc);

        try { $.gc(); } catch (eCleanupGC) {}
        safePause(120, true);
    }


    function buildDisplayTitle(title) {

        var clean =
            decodeFileNameSafe(title);

        // Remove any URI fragments that survived malformed encoding.
        clean =
            clean.replace(/%[0-9A-F]{2}/ig, " ");

        clean =
            clean.replace(
                /\bICON\s+SET\b$/i,
                ""
            );

        clean =
            clean.replace(
                /\bICONS?\b$/i,
                ""
            );

        clean =
            clean.replace(
                /\bSET\b$/i,
                ""
            );

        clean =
            clean.replace(/\s+/g, " ");

        clean =
            trimString(clean);

        if (clean === "") {
            clean = "VECTOR";
        }

        // Keep short names like "CORE VALUES" on ONE line.
        // Longer source names are balanced over two topic lines.
        var topicLines;

        if (clean.length <= 17) {
            topicLines = [clean];
        } else {
            topicLines =
                wrapTitleBalanced(
                    clean,
                    2
                );
        }

        return cleanDisplayText(
            topicLines.join("\r") +
            "\rICON SET"
        );
    }


    function wrapTitleBalanced(
        title,
        maxLines
    ) {

        var words =
            trimString(title)
                .split(/\s+/);

        if (
            words.length <= 1 ||
            maxLines <= 1
        ) {
            return [title];
        }

        // For two lines, choose the split with the smallest
        // difference in character length.
        var bestIndex = 1;
        var bestDiff = 999999;

        for (
            var i = 1;
            i < words.length;
            i++
        ) {

            var left =
                words.slice(0, i)
                    .join(" ");

            var right =
                words.slice(i)
                    .join(" ");

            var diff =
                Math.abs(
                    left.length -
                    right.length
                );

            if (diff < bestDiff) {
                bestDiff = diff;
                bestIndex = i;
            }
        }

        return [
            words.slice(0, bestIndex)
                .join(" "),
            words.slice(bestIndex)
                .join(" ")
        ];
    }


    function getRobotoExtraBoldFont() {

        // First try common PostScript names for Roboto ExtraBold.
        var candidates = [
            "Roboto-ExtraBold",
            "Roboto-ExtraBoldMT",
            "RobotoExtraBold",
            "Roboto-Black",
            "Roboto-Bold"
        ];

        for (
            var i = 0;
            i < candidates.length;
            i++
        ) {
            try {
                return app.textFonts.getByName(
                    candidates[i]
                );
            } catch (eCandidate) {}
        }

        // Then scan installed fonts and prefer a Roboto family
        // whose style/name contains ExtraBold / Extra Bold.
        try {
            for (
                var f = 0;
                f < app.textFonts.length;
                f++
            ) {

                var font =
                    app.textFonts[f];

                var family = "";
                var style = "";
                var name = "";

                try {
                    family =
                        String(font.family)
                            .toLowerCase();
                } catch (eFamily) {}

                try {
                    style =
                        String(font.style)
                            .toLowerCase();
                } catch (eStyle) {}

                try {
                    name =
                        String(font.name)
                            .toLowerCase();
                } catch (eName) {}

                if (
                    family.indexOf("roboto") >= 0 &&
                    (
                        style.indexOf("extra bold") >= 0 ||
                        style.indexOf("extrabold") >= 0 ||
                        name.indexOf("extrabold") >= 0 ||
                        name.indexOf("extra-bold") >= 0
                    )
                ) {
                    return font;
                }
            }
        } catch (eScanFonts) {}

        // If ExtraBold is not installed, use the closest Roboto weight.
        try {
            for (
                var r = 0;
                r < app.textFonts.length;
                r++
            ) {

                var rf =
                    app.textFonts[r];

                var rFamily = "";
                var rStyle = "";

                try {
                    rFamily =
                        String(rf.family)
                            .toLowerCase();
                } catch (eRFamily) {}

                try {
                    rStyle =
                        String(rf.style)
                            .toLowerCase();
                } catch (eRStyle) {}

                if (
                    rFamily.indexOf("roboto") >= 0 &&
                    (
                        rStyle.indexOf("black") >= 0 ||
                        rStyle.indexOf("bold") >= 0
                    )
                ) {
                    return rf;
                }
            }
        } catch (eFallbackScan) {}

        return getPreferredBoldFont();
    }


    function setTextTracking(
        frame,
        tracking
    ) {

        try {
            frame.textRange
                .characterAttributes
                .tracking =
                tracking;
        } catch (eTracking) {}
    }


    function fitTextFrameToBox(
        frame,
        maxWidth,
        maxHeight,
        minFontSize
    ) {

        var guard = 0;

        while (guard < 30) {

            var b = null;

            try {
                b = frame.visibleBounds;
            } catch (eBounds) {
                break;
            }

            if (!b) break;

            var w =
                b[2] - b[0];

            var h =
                b[1] - b[3];

            if (
                w <= maxWidth &&
                h <= maxHeight
            ) {
                break;
            }

            var currentSize = null;

            try {
                currentSize =
                    frame.textRange
                        .characterAttributes
                        .size;
            } catch (eSizeRead) {
                break;
            }

            if (
                !currentSize ||
                currentSize <= minFontSize
            ) {
                break;
            }

            var newSize =
                Math.max(
                    minFontSize,
                    currentSize * 0.92
                );

            try {
                frame.textRange
                    .characterAttributes
                    .size =
                    newSize;

                frame.textRange
                    .characterAttributes
                    .leading =
                    newSize * 1.03;
            } catch (eResizeText) {
                break;
            }

            guard++;
        }
    }


    function setTextLeading(
        frame,
        leading
    ) {

        try {
            frame.textRange
                .characterAttributes
                .leading =
                leading;
        } catch (eLeading) {}
    }


    function safePause(ms, doRedraw) {

        if (!SAFE_SLOW_MODE) return;

        // ULTRA FAST:
        // redraw only when specifically requested after heavy Pathfinder work.
        if (doRedraw) {
            try {
                app.redraw();
            } catch (eRedraw) {}
        }

        if (ms > 0) {
            try {
                $.sleep(ms);
            } catch (eSleep) {}
        }
    }


    function deriveBatchGroupInfo(file) {

        if (!file) return null;

        var name =
            decodeFileNameSafe(
                file.name
            );

        // Remove extension.
        name =
            name.replace(
                /\.[^\.]+$/,
                ""
            );

        name =
            trimString(
                name
            );

        // Supported final sequence styles:
        // BEAUTY 13
        // BEAUTY_13
        // BEAUTY-13
        // BEAUTY (13)
        // BEAUTY13  (only when separated from prior letters poorly;
        //            we prefer delimited versions)
        var m =
            name.match(
                /^(.*?)(?:[\s_\-]*\((\d+)\)|[\s_\-]+(\d+))\s*$/
            );

        if (!m) {
            return null;
        }

        var base =
            trimString(
                m[1]
            );

        var seqText =
            m[2] ||
            m[3];

        if (
            base === "" ||
            !seqText
        ) {
            return null;
        }

        // Clean separators for display/grouping.
        base =
            base.replace(
                /[_\-]+/g,
                " "
            );

        base =
            base.replace(
                /\s+/g,
                " "
            );

        base =
            cleanDisplayText(
                base
            );

        var baseKey =
            base.toLowerCase();

        return {
            baseKey: baseKey,
            displayName: base,
            sequence: parseInt(
                seqText,
                10
            )
        };
    }


    function decodeFileNameSafe(value) {

        var s = String(value);

        // -----------------------------------------------------
        // HARD FIX FOR %20 / DOUBLE-ENCODED %20
        // -----------------------------------------------------
        // Examples:
        // PLASTIC%20PRODUCTS      -> PLASTIC PRODUCTS
        // PLASTIC%2520PRODUCTS    -> PLASTIC PRODUCTS
        // PLASTIC%252520PRODUCTS  -> PLASTIC PRODUCTS
        //
        // Do this manually because Illustrator ExtendScript can
        // behave inconsistently with URI-decoding functions.
        for (var pass = 0; pass < 8; pass++) {

            var before = s;

            // Decode encoded percent signs first.
            s = s.replace(/%25/ig, "%");

            // Then turn encoded spaces into real spaces.
            s = s.replace(/%20/ig, " ");

            if (s === before) {
                break;
            }
        }

        // Optional URI decoding after the guaranteed manual cleanup.
        try {
            s = decodeURI(s);
        } catch (eDecodeURI) {}

        // One more hard cleanup after decodeURI.
        for (var pass2 = 0; pass2 < 4; pass2++) {
            s = s.replace(/%25/ig, "%");
            s = s.replace(/%20/ig, " ");
        }

        // Remove any malformed leftover percent escape from DISPLAY text.
        // This prevents things such as "%2", "%20", "%2520" from appearing.
        s = s.replace(/%[0-9A-F]{0,2}/ig, " ");

        s = s.replace(/\+/g, " ");
        s = s.replace(/\s+/g, " ");

        return trimStringRaw(s);
    }


    function cleanDisplayText(value) {

        var s =
            decodeFileNameSafe(value);

        // Absolute final protection before Illustrator textFrames receive text.
        for (var i = 0; i < 8; i++) {
            s = s.replace(/%25/ig, "%");
            s = s.replace(/%20/ig, " ");
        }

        // No percent escape is ever allowed in generated title/footer text.
        s = s.replace(/%[0-9A-F]+/ig, " ");
        s = s.replace(/%/g, " ");
        s = s.replace(/\s+/g, " ");

        return trimStringRaw(s);
    }


    function trimStringRaw(str) {
        return String(str)
            .replace(/^\s+/, "")
            .replace(/\s+$/, "");
    }


    function trimString(str) {
        return trimStringRaw(str);
    }


    function cleanFolderName(name) {

        var s = decodeFileNameSafe(name);

        s = s.replace(/[_\-]+/g, " ");
        s = s.replace(/\s+/g, " ");

        return trimString(s);
    }


    function sanitizeFileName(name) {

        var s = String(name);

        s = s.replace(/[\\\/:\*\?"<>\|]/g, "_");
        s = s.replace(/\s+/g, "_");
        s = s.replace(/_+/g, "_");

        return s;
    }



    function normalizedSourceBase(fileName) {

        var s = decodeFileNameSafe(fileName);

        // Remove extension.
        s = s.replace(/\.[^\.]+$/, "");

        // The output-name logic removes trailing copy markers,
        // so use the same normalization here.
        s = s.replace(/\s*\(\d+\)\s*$/g, "");

        s = s.replace(/[_\-]+/g, " ");
        s = s.replace(/\s+/g, " ");

        return trimString(s).toLowerCase();
    }


    function deriveOutputBaseNameFromSource(files, inputFolder) {

        var name = "";

        if (files && files.length > 0) {
            name = decodeFileNameSafe(files[0].name);

            // Remove extension.
            name = name.replace(/\.[^\.]+$/, "");

            // Remove only trailing duplicate/copy markers such as:
            // ANALYSIS (5) -> ANALYSIS
            // ANALYSIS(1)  -> ANALYSIS
            name = name.replace(/\s*\(\d+\)\s*$/g, "");

            name = trimString(name);
        }

        if (name === "") {
            name = cleanFolderName(inputFolder.name);
            name = name.replace(/\s*\(\d+\)\s*$/g, "");
            name = trimString(name);
        }

        if (name === "") {
            name = "Icon_Set";
        }

        return name;
    }


    function deriveSetTitleFromSource(files, inputFolder) {

        var name = "";

        if (files && files.length > 0) {
            name = decodeFileNameSafe(files[0].name);
            name = name.replace(/\.[^\.]+$/, "");

            // Remove common trailing sequence numbers, copy markers, and
            // generic icon-set suffixes without damaging the topic name.
            name = name.replace(/\s*\(\d+\)\s*$/g, "");
            name = name.replace(/[\-_ ]+\d+\s*$/g, "");
            name = name.replace(/\b(icon|icons|icon set|set)\b\s*$/i, "");
            name = name.replace(/[_\-]+/g, " ");
            name = name.replace(/\s+/g, " ");
            name = trimString(name);
        }

        if (name === "") {
            name = cleanFolderName(inputFolder.name);
        }

        return name;
    }


    function naturalCompare(a, b) {

        var ax = [];
        var bx = [];

        String(a).toLowerCase().replace(
            /(\d+)|(\D+)/g,
            function (_, n, s) {
                ax.push([n || Infinity, s || ""]);
            }
        );

        String(b).toLowerCase().replace(
            /(\d+)|(\D+)/g,
            function (_, n, s) {
                bx.push([n || Infinity, s || ""]);
            }
        );

        while (ax.length && bx.length) {

            var an = ax.shift();
            var bn = bx.shift();

            var nn =
                (an[0] - bn[0]) ||
                compareStrings(an[1], bn[1]);

            if (nn) return nn;
        }

        return ax.length - bx.length;
    }


    function compareStrings(a, b) {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }


    function copySelection(sel) {

        var arr = [];

        if (!sel) return arr;

        for (var i = 0; i < sel.length; i++) {
            arr.push(sel[i]);
        }

        return arr;
    }


    function clearSelection(doc) {

        try {
            doc.selection = null;
        } catch (e1) {
            try {
                app.executeMenuCommand("deselectall");
            } catch (e2) {}
        }
    }


    function unlockShowAll(doc) {

        try {
            for (var i = 0; i < doc.layers.length; i++) {
                doc.layers[i].locked = false;
                doc.layers[i].visible = true;
            }
        } catch (e) {}
    }


    function selectItems(doc, items) {

        clearSelection(doc);

        for (var i = 0; i < items.length; i++) {

            try {
                items[i].locked = false;
                items[i].hidden = false;
                items[i].selected = true;
            } catch (e) {}
        }
    }


    function selectionHasGroup(doc) {

        var sel = doc.selection;

        if (!sel) return false;

        for (var i = 0; i < sel.length; i++) {

            try {
                if (sel[i].typename === "GroupItem") {
                    return true;
                }
            } catch (e) {}
        }

        return false;
    }


    function ungroupSelectedDeep(doc, maxPasses) {

        var pass = 0;

        while (
            pass < maxPasses &&
            selectionHasGroup(doc)
        ) {

            try {
                app.executeMenuCommand("ungroup");
                safePause(DELAY_AFTER_UNGROUP_MS, false);

            } catch (e) {
                break;
            }

            pass++;
        }

        // FAST STREAMING MODE:
        // no redraw here; the next heavy Pathfinder step handles refresh.
        safePause(DELAY_AFTER_UNGROUP_MS, false);
    }


    function removeWhiteFromSelection(doc) {

        var sel = copySelection(doc.selection);

        for (var i = sel.length - 1; i >= 0; i--) {

            var item = sel[i];

            try {
                if (isWhiteFilledItem(item)) {
                    item.remove();
                }
            } catch (e) {}
        }

        // No redraw needed here in streaming mode.
        safePause(DELAY_AFTER_WHITE_REMOVE_MS, false);
    }


    function isWhiteFilledItem(item) {

        try {

            if (item.typename === "PathItem") {

                if (!item.filled) {
                    return false;
                }

                return isWhiteColor(
                    item.fillColor
                );
            }

            if (
                item.typename ===
                "CompoundPathItem"
            ) {

                if (
                    item.pathItems.length === 0
                ) {
                    return false;
                }

                var p = item.pathItems[0];

                if (!p.filled) {
                    return false;
                }

                return isWhiteColor(
                    p.fillColor
                );
            }

        } catch (e) {}

        return false;
    }


    function isWhiteColor(c) {

        if (!c) return false;

        try {

            if (
                c.typename ===
                "RGBColor"
            ) {
                return (
                    c.red >= WHITE_RGB_MIN &&
                    c.green >= WHITE_RGB_MIN &&
                    c.blue >= WHITE_RGB_MIN
                );
            }

            if (
                c.typename ===
                "CMYKColor"
            ) {
                return (
                    c.cyan <= WHITE_CMYK_MAX &&
                    c.magenta <= WHITE_CMYK_MAX &&
                    c.yellow <= WHITE_CMYK_MAX &&
                    c.black <= WHITE_CMYK_MAX
                );
            }

            if (
                c.typename ===
                "GrayColor"
            ) {
                return (
                    c.gray >= WHITE_GRAY_MIN
                );
            }

            if (
                c.typename ===
                "LabColor"
            ) {
                return (
                    c.l >= 97 &&
                    Math.abs(c.a) <= 4 &&
                    Math.abs(c.b) <= 4
                );
            }

        } catch (e) {}

        return false;
    }


    function safeBounds(item) {

        try {

            var vb = item.visibleBounds;

            return [
                vb[0],
                vb[1],
                vb[2],
                vb[3]
            ];

        } catch (e1) {

            try {

                var gb = item.geometricBounds;

                return [
                    gb[0],
                    gb[1],
                    gb[2],
                    gb[3]
                ];

            } catch (e2) {

                return null;
            }
        }
    }


    function boundsOfItems(items) {

        if (
            !items ||
            items.length === 0
        ) {
            return null;
        }

        var left = null;
        var top = null;
        var right = null;
        var bottom = null;

        for (var i = 0; i < items.length; i++) {

            var b = safeBounds(items[i]);

            if (!b) continue;

            if (
                left === null ||
                b[0] < left
            ) {
                left = b[0];
            }

            if (
                top === null ||
                b[1] > top
            ) {
                top = b[1];
            }

            if (
                right === null ||
                b[2] > right
            ) {
                right = b[2];
            }

            if (
                bottom === null ||
                b[3] < bottom
            ) {
                bottom = b[3];
            }
        }

        if (left === null) {
            return null;
        }

        return [
            left,
            top,
            right,
            bottom
        ];
    }


    function groupItemsDOM(doc, items, parentLayer) {

        if (
            !items ||
            items.length === 0
        ) {
            return null;
        }

        var parent =
            parentLayer ||
            doc.activeLayer;

        var g =
            parent.groupItems.add();

        for (
            var i = items.length - 1;
            i >= 0;
            i--
        ) {

            try {
                items[i].move(
                    g,
                    ElementPlacement.PLACEATBEGINNING
                );
            } catch (e) {}
        }

        clearSelection(doc);

        try {
            g.selected = true;
        } catch (e2) {}

        return g;
    }


    function duplicateItemToDocument(
        item,
        sourceDoc,
        destinationDoc,
        destinationLayer
    ) {

        var dup = null;

        try {

            app.activeDocument =
                sourceDoc;

            dup = item.duplicate(
                destinationLayer,
                ElementPlacement.PLACEATEND
            );

            return dup;

        } catch (directDuplicateError) {

            // Clipboard fallback.
            try {

                app.activeDocument =
                    sourceDoc;

                clearSelection(sourceDoc);

                item.selected = true;

                app.executeMenuCommand("copy");

                app.activeDocument =
                    destinationDoc;

                clearSelection(destinationDoc);

                app.executeMenuCommand("paste");

                var pasted =
                    copySelection(
                        destinationDoc.selection
                    );

                if (
                    pasted.length === 1
                ) {

                    dup = pasted[0];

                    try {
                        dup.move(
                            destinationLayer,
                            ElementPlacement.PLACEATEND
                        );
                    } catch (eMoveLayer) {}

                    return dup;
                }

                if (
                    pasted.length > 1
                ) {

                    dup = groupItemsDOM(
                        destinationDoc,
                        pasted,
                        destinationLayer
                    );

                    return dup;
                }

            } catch (clipboardError) {}

            return null;
        }
    }


    function placeFinalIconByIndex(
        icon,
        index,
        gridLeft,
        gridTop,
        cellW,
        cellH,
        maxIconW,
        maxIconH,
        extraCenterX,
        abTop,
        abHeight
    ) {

        var targetCX;
        var targetCY;

        if (index < 50) {

            var rowIndex =
                Math.floor(index / GRID_COLUMNS);

            var colIndex =
                index % GRID_COLUMNS;

            // Reference screenshot:
            // classic 10 x 5 centered cells with equal spacing.
            targetCX =
                gridLeft +
                (colIndex * cellW) +
                (cellW / 2);

            targetCY =
                gridTop -
                (rowIndex * cellH) -
                (cellH / 2);

        } else if (index === 50) {

            targetCX = extraCenterX;
            targetCY =
                abTop -
                (abHeight * EXTRA_Y1_PCT);

        } else {

            targetCX = extraCenterX;
            targetCY =
                abTop -
                (abHeight * EXTRA_Y2_PCT);
        }

        fitAndCenterFast(
            icon,
            maxIconW,
            maxIconH,
            targetCX,
            targetCY
        );
    }


    function fastGeometricBounds(item) {

        try {
            var b = item.geometricBounds;

            return [
                b[0],
                b[1],
                b[2],
                b[3]
            ];

        } catch (e) {
            return null;
        }
    }


    function fitAndCenterFast(
        item,
        maxWidth,
        maxHeight,
        targetCenterX,
        targetCenterY
    ) {

        // IMPORTANT:
        // Only ONE bounds query per icon.
        // Repeated visibleBounds calls on complex traced artwork can be very slow.
        var b = fastGeometricBounds(item);

        if (!b) return;

        var w = b[2] - b[0];
        var h = b[1] - b[3];

        if (w <= 0 || h <= 0) return;

        var originalCenterX =
            (b[0] + b[2]) / 2;

        var originalCenterY =
            (b[1] + b[3]) / 2;

        var scaleW = maxWidth / w;
        var scaleH = maxHeight / h;

        var scale =
            Math.min(scaleW, scaleH);

        if (scale > 25) {
            scale = 25;
        }

        var pct = scale * 100;

        try {
            // Resize around center, so the center stays in the same position.
            item.resize(
                pct,
                pct,
                true,
                true,
                true,
                true,
                pct,
                Transformation.CENTER
            );
        } catch (eResize) {}

        try {
            // Since resize uses Transformation.CENTER, no second bounds query
            // is needed. Translate directly from the original center.
            item.translate(
                targetCenterX - originalCenterX,
                targetCenterY - originalCenterY
            );
        } catch (eTranslate) {}
    }


    function fitItemInside(
        item,
        maxWidth,
        maxHeight
    ) {

        var b = safeBounds(item);

        if (!b) return;

        var w = b[2] - b[0];
        var h = b[1] - b[3];

        if (
            w <= 0 ||
            h <= 0
        ) {
            return;
        }

        var scaleW =
            maxWidth / w;

        var scaleH =
            maxHeight / h;

        var scale =
            Math.min(
                scaleW,
                scaleH
            );

        // Do not enlarge more than 2500% in one step.
        if (scale > 25) {
            scale = 25;
        }

        var pct =
            scale * 100;

        try {

            item.resize(
                pct,
                pct,
                true,
                true,
                true,
                true,
                pct,
                Transformation.CENTER
            );

        } catch (e) {}
    }


    function centerItemAt(
        item,
        centerX,
        centerY
    ) {

        var b = safeBounds(item);

        if (!b) return;

        var currentX =
            (b[0] + b[2]) / 2;

        var currentY =
            (b[1] + b[3]) / 2;

        try {
            item.translate(
                centerX - currentX,
                centerY - currentY
            );
        } catch (e) {}
    }


    function recolorArtworkRGB(item, r, g, b) {

        recolorItemRecursive(
            item,
            r,
            g,
            b
        );
    }


    function recolorArtworkWhite(item) {

        recolorItemRecursive(
            item,
            255,
            255,
            255
        );
    }


    function recolorItemRecursive(
        item,
        r,
        g,
        b
    ) {

        try {

            if (
                item.typename ===
                "GroupItem"
            ) {

                for (
                    var i = 0;
                    i < item.pageItems.length;
                    i++
                ) {
                    recolorItemRecursive(
                        item.pageItems[i],
                        r,
                        g,
                        b
                    );
                }

                return;
            }

            if (
                item.typename ===
                "CompoundPathItem"
            ) {

                for (
                    var cp = 0;
                    cp <
                    item.pathItems.length;
                    cp++
                ) {
                    recolorPath(
                        item.pathItems[cp],
                        r,
                        g,
                        b
                    );
                }

                return;
            }

            if (
                item.typename ===
                "PathItem"
            ) {

                recolorPath(
                    item,
                    r,
                    g,
                    b
                );
            }

        } catch (e) {}
    }


    function recolorPath(
        path,
        r,
        g,
        b
    ) {

        var white =
            new RGBColor();

        white.red = r;
        white.green = g;
        white.blue = b;

        try {
            if (path.filled) {
                path.fillColor = white;
            }
        } catch (eFill) {}

        try {
            if (path.stroked) {
                path.strokeColor = white;
            }
        } catch (eStroke) {}
    }


    function getPreferredBoldFont() {

        var candidates = [
            "Arial-BoldMT",
            "Arial-Bold",
            "ArialMT",
            "MyriadPro-Bold",
            "MyriadPro-Regular"
        ];

        for (
            var i = 0;
            i < candidates.length;
            i++
        ) {

            try {
                return app.textFonts.getByName(
                    candidates[i]
                );
            } catch (e) {}
        }

        return null;
    }


    function getPreferredCondensedBoldFont() {

        var candidates = [
            "ArialNarrow-Bold",
            "ArialNarrow-BoldMT",
            "Arial-BoldMT",
            "Arial-Bold",
            "MyriadPro-Bold"
        ];

        for (
            var i = 0;
            i < candidates.length;
            i++
        ) {

            try {
                return app.textFonts.getByName(
                    candidates[i]
                );
            } catch (e) {}
        }

        return getPreferredBoldFont();
    }


    function applyCenteredTextStyle(
        frame,
        fontSize,
        fontObj,
        uppercase
    ) {

        try {
            if (uppercase) {
                frame.contents =
                    String(
                        frame.contents
                    ).toUpperCase();
            }
        } catch (eUpper) {}

        try {
            frame.textRange.characterAttributes.size =
                fontSize;
        } catch (eSize) {}

        if (fontObj) {
            try {
                frame.textRange.characterAttributes.textFont =
                    fontObj;
            } catch (eFont) {}
        }

        try {
            frame.textRange.paragraphAttributes.justification =
                Justification.CENTER;
        } catch (eJustify) {}

        try {
            frame.textRange.characterAttributes.tracking =
                20;
        } catch (eTrack) {}
    }


    function setTextFillRGB(
        frame,
        r,
        g,
        b
    ) {

        var c =
            new RGBColor();

        c.red = r;
        c.green = g;
        c.blue = b;

        try {
            frame.textRange.characterAttributes.fillColor =
                c;
        } catch (e) {}
    }


    function centerTextFrameAt(
        frame,
        x,
        y
    ) {

        try {

            var b =
                frame.visibleBounds;

            var cx =
                (b[0] + b[2]) / 2;

            var cy =
                (b[1] + b[3]) / 2;

            frame.translate(
                x - cx,
                y - cy
            );

        } catch (e) {}
    }


    function wrapTitle(
        title,
        maxChars,
        maxLines
    ) {

        var words =
            trimString(title)
            .split(/\s+/);

        var lines = [];
        var current = "";

        for (
            var i = 0;
            i < words.length;
            i++
        ) {

            var test =
                current === "" ?
                words[i] :
                current + " " + words[i];

            if (
                test.length <= maxChars ||
                current === ""
            ) {

                current = test;

            } else {

                lines.push(current);
                current = words[i];

                if (
                    lines.length ===
                    maxLines - 1
                ) {

                    // Put all remaining words
                    // into the final line.
                    var rest = current;

                    for (
                        var j = i + 1;
                        j < words.length;
                        j++
                    ) {
                        rest +=
                            " " +
                            words[j];
                    }

                    current = rest;
                    break;
                }
            }
        }

        if (current !== "") {
            lines.push(current);
        }

        while (
            lines.length > maxLines
        ) {

            var last =
                lines.pop();

            lines[
                lines.length - 1
            ] +=
                " " +
                last;
        }

        return lines;
    }


    function closeNoSave(doc) {

        try {
            doc.close(
                SaveOptions.DONOTSAVECHANGES
            );
        } catch (e) {}
    }


    function pad2(n) {
        return (
            n < 10 ?
            "0" + n :
            String(n)
        );
    }

})();
