# github-action-json-property

Get a specified property of a json file.

## Usage

Use the action inside your workflow yaml file like this:

```yaml
...
- name: get version
    id: version
    uses: notiz-dev/github-action-json-property@master
    with: 
        path: 'package.json'
        prop_path: 'version'
- run: echo ${{steps.version.outputs.prop}} 
...

```


Get a nested property value with dot separated prop_path 

```yaml
...
- name: get nested property
    id: format_script
    uses: notiz-dev/github-action-json-property@master
    with: 
        path: 'package.json'
        prop_path: 'scripts.format'
- run: echo ${{steps.format_script.outputs.prop}} 
...

```
