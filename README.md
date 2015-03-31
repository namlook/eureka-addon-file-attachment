# Eureka-addon-file-attachment

An Eureka addon that provides file attachment support.

This addon provides:

 - the `file` resource
 - the model : `File`
 - the property widget: `file-attachment`
 - the model widgets: `model-file-edit` and `model-file-new`


## Usage:

    {
        Email: {
            properties: {
                title: {
                    type: 'string'
                },
                body: {
                    type: 'string'
                },
                attachments: {
                    type: 'string',

                    // multi for multiple attachment
                    multi: true,

                    widget: {
                        type: 'file-attachment',

                        // if true, allow to search an already saved file
                        // in order to attach it
                        autosuggest: false,

                        // switch to a detailed view
                        useDetailedStyle: false
                    }
                }
            }
        }
    }

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
