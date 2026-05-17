---
name: claude-code-video-toolkit
description: >
  Comprehensive video and image generation toolkit powered by AI. Use this skill to generate
  videos from text prompts, create images, upload media, check generation status, analyze
  virality potential, and manage your creative workspace. Invoke when the user asks to create,
  generate, or produce video or image content, check generation jobs, predict content performance,
  or manage media assets.
argument-hint: [generate-video|generate-image|status|virality|upload|gallery|balance] [options]
allowed-tools: mcp__db07f906-cb03-4b9b-8641-2e5e8aa01f19__generate_video, mcp__db07f906-cb03-4b9b-8641-2e5e8aa01f19__generate_image, mcp__db07f906-cb03-4b9b-8641-2e5e8aa01f19__job_display, mcp__db07f906-cb03-4b9b-8641-2e5e8aa01f19__media_upload, mcp__db07f906-cb03-4b9b-8641-2e5e8aa01f19__media_confirm, mcp__db07f906-cb03-4b9b-8641-2e5e8aa01f19__show_generations, mcp__db07f906-cb03-4b9b-8641-2e5e8aa01f19__show_medias, mcp__db07f906-cb03-4b9b-8641-2e5e8aa01f19__virality_predictor, mcp__db07f906-cb03-4b9b-8641-2e5e8aa01f19__balance, mcp__db07f906-cb03-4b9b-8641-2e5e8aa01f19__list_workspaces, mcp__db07f906-cb03-4b9b-8641-2e5e8aa01f19__select_workspace, mcp__db07f906-cb03-4b9b-8641-2e5e8aa01f19__models_explore, mcp__db07f906-cb03-4b9b-8641-2e5e8aa01f19__show_characters, mcp__db07f906-cb03-4b9b-8641-2e5e8aa01f19__show_plans_and_credits, mcp__db07f906-cb03-4b9b-8641-2e5e8aa01f19__transactions, mcp__db07f906-cb03-4b9b-8641-2e5e8aa01f19__sync_agents, mcp__db07f906-cb03-4b9b-8641-2e5e8aa01f19__show_marketing_studio
---

# Claude Code Video Toolkit

AI-powered video and image generation toolkit. Generate videos, create images, manage media
assets, and analyze content performance — all from your terminal.

See [reference.md](reference.md) for detailed command documentation and examples.

## How to Use This Skill

Parse the user's request and map it to one of the commands below. If no specific command is
given, infer intent from context (e.g. "make a video of a sunset" → `generate-video`).

When arguments are missing and required, ask the user before proceeding.

---

## Commands

### `generate-video`
Generate a video from a text prompt.

**Steps:**
1. Call `generate_video` with the user's prompt and any specified options (duration, model, style).
2. Call `job_display` to show the job status and wait for completion.
3. When done, show the result and ask if the user wants a virality analysis.

**Tips:**
- Default duration: 4–5 seconds if not specified.
- Use `models_explore` first if the user asks which model to use.
- If the user supplies a reference image/video, call `media_upload` + `media_confirm` first,
  then pass the confirmed media ID to `generate_video`.

---

### `generate-image`
Generate an image from a text prompt.

**Steps:**
1. Call `generate_image` with the prompt and any specified options.
2. Call `job_display` to show status and wait for completion.
3. Display the result.

---

### `status`
Check the status of a running or recent generation job.

**Steps:**
1. Call `job_display` with the job ID if provided, otherwise call `show_generations` to list
   recent jobs and let the user pick one.

---

### `gallery`
Browse past generations or uploaded media.

- For past generations: call `show_generations`.
- For uploaded media assets: call `show_medias`.
- If the user says "my media" or "uploads", use `show_medias`. Otherwise default to `show_generations`.

---

### `virality`
Predict the virality and engagement potential of a video.

**Steps:**
1. If the user provides a video file path, call `media_upload` + `media_confirm` first.
2. Call `virality_predictor` with the video reference.
3. Summarize the key findings: hook strength, retention risk, predicted engagement, and top recommendations.

---

### `upload`
Upload a local media file to the workspace.

**Steps:**
1. Call `media_upload` with the file path.
2. Call `media_confirm` to finalize the upload.
3. Report the confirmed media ID for use in subsequent generation commands.

---

### `balance`
Check current credit balance and usage.

1. Call `balance` and display the result clearly.
2. If balance is low, call `show_plans_and_credits` to show upgrade options.

---

### `workspace`
Manage workspaces.

- To list workspaces: call `list_workspaces`.
- To switch: call `select_workspace` with the chosen workspace ID.
- To sync agents: call `sync_agents`.

---

### `models`
Explore available generation models and their capabilities.

Call `models_explore` and present the results in a clear, comparable format.

---

### `characters`
Show available characters for video generation.

Call `show_characters` and display the character library.

---

### `marketing-studio`
Open the marketing studio for campaign-level video workflows.

Call `show_marketing_studio`.

---

### `plans`
Show available plans and credit packages.

Call `show_plans_and_credits`.

---

### `transactions`
Show transaction history.

Call `transactions`.

---

## Error Handling

- If a tool call fails due to insufficient credits, immediately call `balance` and
  `show_plans_and_credits` so the user can top up.
- If a job fails, report the error message and suggest adjusting the prompt or model.
- If media upload fails, verify the file path exists and the format is supported (MP4, MOV,
  PNG, JPG, WebP).

## Supported Media Formats

| Type  | Formats                     |
|-------|-----------------------------|
| Video | MP4, MOV, WebM              |
| Image | PNG, JPG, JPEG, WebP        |
