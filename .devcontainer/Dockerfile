# Use an official lightweight Node image as a base
FROM node:18-bullseye-slim

# Install dependencies needed for Bun, Git, and basic tools with cleanup
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl git bash unzip sudo ca-certificates openssh-client && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Switch to the "vscode" user
USER node

# Default command
CMD ["bash"]
