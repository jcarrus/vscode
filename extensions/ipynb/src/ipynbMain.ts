/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import { NotebookSerializer } from './notebookSerializer';

export function activate(context: vscode.ExtensionContext) {
	const serializer = new NotebookSerializer(context);
	context.subscriptions.push(vscode.workspace.registerNotebookSerializer('jupyter-notebook', serializer, {
		transientOutputs: false,
		transientCellMetadata: {
			breakpointMargin: true,
			inputCollapsed: true,
			outputCollapsed: true,
			custom: false
		}
	}));

	return {
		exportNotebook: (notebook: vscode.NotebookData): Uint8Array => {
			return exportNotebook(notebook, serializer);
		}
	};
}

function exportNotebook(notebook: vscode.NotebookData, serializer: NotebookSerializer): Uint8Array {
	return serializer.serializeNotebook(notebook, new vscode.CancellationTokenSource().token);
}

export function deactivate() { }
