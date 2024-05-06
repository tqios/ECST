

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Study',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('study_user_email', models.CharField(max_length=300)),
                ('study_todo', models.CharField(max_length=300)),
                ('study_duration', models.DurationField(default=0)),
                ('study_completed', models.BooleanField(default=False)),
                ('study_status', models.TimeField(auto_now_add=True)),
                ('study_description', models.CharField(max_length=300)),
            ],
        ),
    ]
