(function ($, Drupal) {
    // Define a Drupal behavior for custom Gutenberg editor enhancements
    Drupal.behaviors.myCustomBehavior = {
        attach: function (context, settings) {
            // Check if we're on an edit page or an add page for 'page' or 'program' content types
            var isEditPage = /node\/\d+\/edit/.test(window.location.pathname);
            var isAddPage = /node\/add\/(page|program)/.test(window.location.pathname);

            // Only run the customizations on edit or add pages
            if (isEditPage || isAddPage) {
                // Custom styles for paragraphs
                wp.blocks.registerBlockStyle('core/paragraph', {
                    name: 'wp-paragraph-pl',
                    label: 'Odsadit blok zleva', // Indent block from left
                });

                wp.blocks.registerBlockStyle('core/paragraph', {
                    name: 'wp-paragraph-pr',
                    label: 'Odsadit blok zprava', // Indent block from right
                });

                wp.blocks.registerBlockStyle('core/paragraph', {
                    name: 'wp-paragraph-p',
                    label: 'Zarovnat blok', // Align block
                });

                // Removing default class from paragraphs
                wp.hooks.addFilter(
                    'blocks.getBlockDefaultClassName',
                    'my-plugin/add-default-paragraph-style',
                    function (className, blockType) {
                        if (blockType.name === 'core/paragraph') {
                            return className = '';
                        }
                        return className;
                    }
                );

                // Unregister an existing paragraph style
                wp.domReady(function() {
                    wp.blocks.unregisterBlockStyle('core/paragraph', 'odsadenie-zleva');
                });

                // Add a default class to paragraphs
                wp.hooks.addFilter(
                    'blocks.getBlockDefaultClassName',
                    'my-plugin/add-default-paragraph-class',
                    function (className, blockType) {
                        if (blockType.name === 'core/paragraph') {
                            return 'default';
                        }
                        return className;
                    }
                );

                // Custom style for h2
                wp.blocks.registerBlockStyle('core/h2', {
                    name: 'title',
                    label: 'Title',
                });

                // Custom styles for columns
                wp.blocks.registerBlockStyle('core/column', {
                    name: 'wp-column-pl',
                    label: 'Odsadit slopec zleva', // Indent column from left
                });

                wp.blocks.registerBlockStyle('core/column', {
                    name: 'wp-column-pr',
                    label: 'Odsadit slopec zprava', // Indent column from right
                });

                // Modify default class for columns
                wp.hooks.addFilter(
                    'blocks.getBlockDefaultClassName',
                    'my-plugin/add-default-column-style',
                    function (className, blockType) {
                        if (blockType.name === 'core/column') {
                            return className + '';
                        }
                        return className;
                    }
                );

                // Custom styles for groups
                wp.blocks.registerBlockStyle('core/group', {
                    name: 'padding-left',
                    label: 'Padding left',
                });

                wp.blocks.registerBlockStyle('core/group', {
                    name: 'padding-right',
                    label: 'Padding right',
                });

                wp.blocks.registerBlockStyle('core/group', {
                    name: 'padding-left-right',
                    label: 'Padding left & right',
                });

                // Modify default class for groups
                wp.hooks.addFilter(
                    'blocks.getBlockDefaultClassName',
                    'my-plugin/add-default-group-style',
                    function (className, blockType) {
                        if (blockType.name === 'core/group') {
                            return className + '';
                        }
                        return className;
                    }
                );

                // Custom style for buttons
                wp.blocks.registerBlockStyle('core/button', {
                    name: 'zpc-button',
                    label: 'ZPC button',
                });

                // Modify default class for buttons
                wp.hooks.addFilter(
                    'blocks.getBlockDefaultClassName',
                    'my-plugin/add-default-button-style',
                    function (className, blockType) {
                        if (blockType.name === 'core/button') {
                            return className + '';
                        }
                        return className;
                    }
                );

                // Custom styles for images
                wp.blocks.registerBlockStyle('core/image', {
                    name: 'wp-image-pl',
                    label: 'Odsadit obrazek zleva', // Indent image from left
                });

                wp.blocks.registerBlockStyle('core/image', {
                    name: 'wp-image-pr',
                    label: 'Odsadit obrazek zprava', // Indent image from right
                });

                wp.blocks.registerBlockStyle('core/image', {
                    name: 'wp-image-left',
                    label: 'Prilepit obrazek nalavo', // Align image to left
                });

                wp.blocks.registerBlockStyle('core/image', {
                    name: 'wp-image-right',
                    label: 'Prilepit obrazek napravo', // Align image to right
                });

                // Unregister the 'rounded' style for images
                wp.domReady(function() {
                    wp.blocks.unregisterBlockStyle('core/image', 'rounded');
                });

                // Modify default class for images
                wp.hooks.addFilter(
                    'blocks.getBlockDefaultClassName',
                    'my-plugin/add-default-image-style',
                    function (className, blockType) {
                        if (blockType.name === 'core/image') {
                            return className + '';
                        }
                        return className;
                    }
                );

                // Custom style for files
                wp.blocks.registerBlockStyle('core/file', {
                    name: 'wp-file-left',
                    label: 'Odsadit soubor zleva', // Indent file from left
                });

                // Modify default class for files
                wp.hooks.addFilter(
                    'blocks.getBlockDefaultClassName',
                    'my-plugin/add-default-file-style',
                    function (className, blockType) {
                        if (blockType.name === 'core/file') {
                            return className + '';
                        }
                        return className;
                    }
                );

                // jQuery code to observe and remove unwanted class
                jQuery(document).ready(function($) {
                    const $editor = $('.editor-styles-wrapper');

                    // Function to remove the undesired class
                    function removeClassFromParagraphs() {
                        const $paragraphs = $('.wp-block-paragraph.is-style-odsadenie-zleva', $editor);
                        $paragraphs.removeClass('is-style-odsadenie-zleva');
                    }

                    // Initial check and removal
                    removeClassFromParagraphs();

                    // Set up an observer to watch for changes in the editor
                    const observer = new MutationObserver(function(mutations) {
                        mutations.forEach(function(mutation) {
                            if (mutation.type === "childList") {
                                removeClassFromParagraphs();
                            }
                        });
                    });

                    // Start observing the editor for changes
                    observer.observe($editor[0], {
                        childList: true,
                        subtree: true
                    });
                });
            }
        }
    };
})(jQuery, Drupal);
