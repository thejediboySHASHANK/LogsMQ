## System Design/HLD of RabbitMQ based NodeJS Microservices architecture

![image](https://github.com/thejediboySHASHANK/LogsMQ/assets/95047201/b0722c37-1494-4176-8b94-ef6fd50ffb7d)


# Setting Up RabbitMQ on Docker in WSL2

This guide provides step-by-step instructions on how to set up RabbitMQ using Docker on Windows Subsystem for Linux version 2 (WSL2).

## Step 1: Install Docker on WSL2

First, ensure Docker is installed and configured to work with WSL2. Follow these steps to install Docker:

1. **Update your package list**:
   ```bash
   sudo apt update

2. **Install Docker**:
   ```bash
   sudo apt install docker.io

3. **Start and enable the Docker service:**:
   ```bash
   sudo systemctl start docker
   sudo systemctl enable docker

4. **Add your user to the Docker group to run Docker commands without sudo (optional but recommended):**:
   ```bash
   sudo usermod -aG docker $USER
   newgrp docker

## Step 2: Pull the RabbitMQ Docker Image

RabbitMQ offers official Docker images with the management plugin included, which provides a web-based UI for managing RabbitMQ. To pull the latest image, use the following command:

```bash
docker pull rabbitmq:management
```

## Step 3: Run RabbitMQ Container

Run a RabbitMQ container with the following command. This setup includes the management interface:

```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management
```

### Explanation of Docker Run Flags

- `-d`: Run the container in **detached mode** (in the background), which means the Docker container runs in the background of your terminal. It does not receive input or display output unless you fetch the container logs.
- `--name rabbitmq`: Assigns the container a name (`rabbitmq`), which can be used to reference the container within a Docker network or when starting and stopping the container.
- `-p 5672:5672`: Maps port 5672 on the host to port 5672 in the container. This is the standard port for RabbitMQ's AMQP protocol, allowing applications on your host machine to communicate with RabbitMQ.
- `-p 15672:15672`: Maps port 15672 on the host to port 15672 in the container. This port is used by RabbitMQ's management plugin, which provides a web-based UI accessible at `http://localhost:15672`.


## Step 4: Verify the Container is Running

To check that the RabbitMQ container is successfully running, execute the following command:

```bash
docker ps
```







