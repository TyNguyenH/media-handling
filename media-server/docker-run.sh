docker run  --name shaka-media-server \
            -v /home/ubuntu/media-handling:/home/ubuntu/media-handling:ro \
            -d -p 7500:7500 shaka-media-server \