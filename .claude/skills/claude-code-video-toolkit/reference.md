# Video Toolkit — Reference

## Quick Reference

| Command             | What it does                                      |
|---------------------|---------------------------------------------------|
| `generate-video`    | Generate a video from a text prompt               |
| `generate-image`    | Generate an image from a text prompt              |
| `status`            | Check job status                                  |
| `gallery`           | Browse past generations and uploaded media        |
| `virality`          | Predict video virality and engagement             |
| `upload`            | Upload a local media file                         |
| `balance`           | Check credit balance                              |
| `workspace`         | List or switch workspaces                         |
| `models`            | Explore available AI models                       |
| `characters`        | Browse character library                          |
| `marketing-studio`  | Open marketing studio                             |
| `plans`             | View plans and credit packages                    |
| `transactions`      | View transaction history                          |

---

## Usage Examples

### Generate a video
```
/claude-code-video-toolkit generate-video A cinematic drone shot over a misty mountain range at dawn
/claude-code-video-toolkit generate-video A product showcase of a sleek smartwatch rotating slowly on a white background
```

### Generate an image
```
/claude-code-video-toolkit generate-image A photorealistic portrait of a futuristic city at night
/claude-code-video-toolkit generate-image Abstract geometric patterns in neon colors
```

### Check job status
```
/claude-code-video-toolkit status
/claude-code-video-toolkit status job_abc123
```

### Analyze virality
```
/claude-code-video-toolkit virality /path/to/my-video.mp4
/claude-code-video-toolkit virality  (after generating — will use the latest generation)
```

### Upload media for use as reference
```
/claude-code-video-toolkit upload /path/to/reference.mp4
/claude-code-video-toolkit upload /path/to/style-frame.png
```

### Check balance
```
/claude-code-video-toolkit balance
```

### Browse gallery
```
/claude-code-video-toolkit gallery
/claude-code-video-toolkit gallery uploads
```

---

## Prompt Tips

**For videos:**
- Include camera movement: "slow zoom", "pan left", "static shot", "handheld camera"
- Specify lighting: "golden hour", "neon-lit", "overcast", "studio lighting"
- Set the mood: "cinematic", "documentary-style", "hyperrealistic", "stylized"
- Add motion details: "gentle breeze", "flowing fabric", "rippling water"

**For images:**
- Specify art style: "photorealistic", "oil painting", "digital art", "watercolor"
- Include composition cues: "wide angle", "close-up", "bird's eye view"
- Describe lighting explicitly for best results

**Virality optimization:**
- Strong hook in first 3 seconds significantly improves predicted engagement
- Clear subject focus and motion outperform static or cluttered scenes
- Music/audio sync (when applicable) boosts retention scores

---

## Workflow: Generate → Analyze → Publish

1. Generate video: `/claude-code-video-toolkit generate-video <prompt>`
2. Wait for job completion (auto-polled via `job_display`)
3. Analyze virality: `/claude-code-video-toolkit virality`
4. Iterate on prompt based on recommendations
5. When satisfied, download or share from gallery

---

## Model Selection Guide

Use `/claude-code-video-toolkit models` to see all available models with their capabilities.

General guidance:
- **Fast/draft**: Use lower-tier models for rapid iteration
- **Quality**: Use higher-tier models for final output
- **Specialized**: Some models excel at specific styles (product, cinematic, animation)

---

## Troubleshooting

| Issue                          | Solution                                                        |
|--------------------------------|-----------------------------------------------------------------|
| Job stuck in pending           | Call `status` — if >10 min, retry with same prompt             |
| Insufficient credits           | Use `balance` then `plans` to top up                           |
| Upload fails                   | Check file path and format (MP4/MOV/PNG/JPG/WebP only)         |
| Poor quality output            | Add more detail to prompt; try a different model               |
| Virality score unavailable     | Ensure video is fully generated before analyzing               |
