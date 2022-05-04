FROM openjdk:11
RUN addgroup --system kas
RUN adduser --system --group sa
USER sa:kas
ARG JAR_FILE=backend/kas/target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
EXPOSE 8080